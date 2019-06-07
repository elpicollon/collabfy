const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const AuthConfig = require('../config/auth');
const Bot = require('./models/Bot');
const QueueItem = require('./models/QueueItem');
const QueueManager = require('./models/QueueManager');

const spotifyApi = new SpotifyWebApi({
  clientId: AuthConfig.CLIENT_ID,
  clientSecret: AuthConfig.CLIENT_SECRET
});

const Router = express.Router;
let accessToken = null;

const fetchNewToken = callback => {
  spotifyApi.clientCredentialsGrant().then(data => {
    accessToken = data.body['access_token'];
    const expires_in = data.body['expires_in'];
    spotifyApi.setAccessToken(accessToken);
    callback && callback(accessToken);
    setTimeout(() => {
      fetchNewToken();
    }, (expires_in - 10 * 60) * 1000);
  }).catch(e => {
    console.error('fetchNewToken > Error fetching new token', e);
  });
};

const getToken = callback => {
  if (accessToken !== null) {
    callback && callback(accessToken);
  } else {
    fetchNewToken(callback);
  }
};

const botUser = new Bot({
  getToken: getToken,
  spotifyApi: spotifyApi
});

let users = [botUser.toJSON()];
let globalSocket = null;
let globalIo = null;

const queueManager = new QueueManager({
  onPlay: () => {
    const { track, user } = queueManager.getPlayingContext();

    users.forEach(u => {
      u.socketIdArray.forEach((socketId, index) => {
        if (index === 0) {
          globalIo.to(socketId).emit('play track', track, user);
        } else {
          globalIo.to(socketId).emit('update now playing', track, user);
        }
      });
    });
  },

  onQueueChanged: () => {
    globalSocket && globalSocket.emit('update queue', queueManager.getQueue());
    globalSocket && globalSocket.broadcast.emit('update queue', queueManager.getQueue());
  },

  onQueueEnded: async () => {
    globalSocket && globalSocket.emit('update queue', queueManager.getQueue());
    globalSocket && globalSocket.broadcast.emit('update queue', queueManager.getQueue());

    const botRecommendation = await botUser.generateRecommendation(queueManager.playedHistory, getToken, spotifyApi);

    if (botRecommendation !== null) {
      queueManager.addItem(
        new QueueItem({
          track: botRecommendation,
          user: botUser
        }).toJSON()
      );
    }
  }
});

queueManager.read();
queueManager.init();

const exportedApi = io => {
  let api = Router();

  globalIo = io;

  api.get('/', (req, res) => {
    res.json({ version });
  });

  api.get('/now-playing', (req, res) => {
    res.json(queueManager.playingContext);
  });

  api.get('/queue', (req, res) => {
    res.json(queueManager.queue);
  });

  api.get('/users', (req, res) => {
    res.json(users);
  });

  api.get('/me', async (req, res) => {
    await getToken();

    try {
      const resApi = spotifyApi.getMe();
      res.json(resApi.body);
    } catch (e) {
      console.log('error', e);
      res.status(500);
    }
  });

  io.on('connection', socket => {
    globalSocket = socket;

    socket.on('queue track', trackId => {
      getToken(() => {
        spotifyApi.getTrack(trackId).then(resApi => {
            queueManager.addItem(
              new QueueItem({
                user: socket.user,
                track: resApi.body
              }).toJSON()
            );
          }).catch(e => {
            console.log('error', e);
          });
      });
    });

    socket.on('vote up', id => {
      queueManager.voteUpId(socket.user, id);
    });

    socket.on('vote down', id => {
      queueManager.voteDownId(users, socket.user, id);
    });

    socket.on('remove track', id => {
      queueManager.removeId(socket.user, id);
    });

    socket.on('user login', user => {
      let index = -1;

      users.forEach((u, i) => {
        if (u.id === user.id) {
          index = i;
        }
      });

      socket.user = user;
      if (index !== -1) {
        users[index].socketIdArray.push(socket.id);
      } else {
        users.push(Object.assign({}, user, { socketIdArray: [socket.id] }));
        socket.emit('update users', users);
        socket.broadcast.emit('update users', users);

        const playingContext = queueManager.getPlayingContext();
        if (playingContext.track !== null) {
          socket.emit(
            'play track',
            playingContext.track,
            playingContext.user,
            Date.now() - playingContext.startTimestamp
          );
        }
      }
    });

    socket.on('disconnect', () => {
      let userIndex = -1;
      let socketIdIndex = -1;

      users.forEach((user, i) => {
        user.socketIdArray.forEach((socketId, j) => {
          if (socketId === socket.id) {
            userIndex = i;
            socketIdIndex = j;
          }
        });
      });

      if (userIndex !== -1 && socketIdIndex !== -1) {
        if (users[userIndex].socketIdArray.length > 1) {
          users[userIndex].socketIdArray.splice(socketIdIndex, 1);
        } else {
          users.splice(userIndex, 1);
          socket.emit('update users', users.map(u => u.user));
          socket.broadcast.emit('update users', users.map(u => u.user));
        }
      }
    });
  });

  return api;
};

module.exports = exportedApi;
