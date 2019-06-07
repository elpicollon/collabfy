const fs = require('fs');

class QueueManager {
  constructor(options) {
    this.playingContext = {
      track: null,
      user: null,
      startTimestamp: null
    };

    this.queue = [];
    this.onQueueChanged = options.onQueueChanged;
    this.onQueueEnded = options.onQueueEnded;
    this.onPlay = options.onPlay;
    this.getToken = options.getToken;
    this.spotifyApi = options.spotifyApi;
    this.playedHistory = [];
  }

  handleQueueChanged() {
    this.sort();
    this.save();
    this.onQueueChanged();
  }

  getPlayingContext() {
    return this.playingContext;
  }

  getQueue() {
    return this.queue;
  }

  sort() {
    this.queue.sort((a, b) => {
      const diffLikes = b.likes.length - a.likes.length;
      const diffUnlikes = b.unlikes.length - a.unlikes.length;
      
      if(diffUnlikes !== 0) {
        return -diffUnlikes;
      } else if (diffLikes !== 0) {
        return diffLikes;
      } else {
        return a.queuedTimestamp - b.queuedTimestamp;
      }
    });
  }

  addItem(queueItem) {
    this.queue.push(queueItem);
    this.handleQueueChanged();

    if (this.playingContext.track === null) {
      this.play();
    }
  }

  removeId(user, id) {
    const index = this.queue.findIndex(item => item.id === id);

    if (index !== -1 && this.queue[index].user.id === user.id) {
      this.queue.splice(index, 1);
      this.handleQueueChanged();
    }
  }

  init() {
    this.play();
  }

  play() {
    if (this.queue.length > 0) {
      const queueItem = this.queue.shift();
      
      this.handleQueueChanged();
      
      this.playingContext = {
        track: queueItem.track,
        user: queueItem.user,
        startTimestamp: Date.now(),
        likes: queueItem.likes,
        unlikes: queueItem.unlikes
      };

      this.playedHistory.push({
        track: queueItem.track,
        user: queueItem.user
      });
      
      setTimeout(() => {
        this.play();
      }, 2000 + queueItem.track.duration_ms);
      
      this.onPlay();
    } else {
      this.playingContext = {
        track: null,
        user: null,
        startTimestamp: null,
        likes: [],
        unlikes: []
      };

      this.onQueueEnded();
    }
  }

  voteUpId(user, id) {
    let index = this.queue.findIndex(item => item.id === id);
    if (index === -1) return false;
    let likes = this.queue[index].likes;
    let unlikes = this.queue[index].unlikes;
    
    if (likes) {
      let userLikes = likes.filter(v => v.id === user.id);
      let userUnlikes = unlikes.filter(v => v.id === user.id);
      if (userLikes.length === 0 && userUnlikes.length === 0) {
        this.queue[index].likes.push(user);
        this.handleQueueChanged();
        return true;
      }
    }
  }

  voteDownId(users, user, id) {
    let index = this.queue.findIndex(item => item.id === id);
    let likes = this.queue[index].likes;
    let unlikes = this.queue[index].unlikes;
    let userUnlikes = unlikes.filter(v => v.id === user.id);
    let userLikes = likes.filter(v => v.id === user.id);

    if (userUnlikes.length === 0 && userLikes.length === 0) {
      this.queue[index].unlikes.push(user);

      if (unlikes.length >= ((users.length - 1) / 2)) {
        this.queue.splice(index, 1);
      }

      this.handleQueueChanged();
    }
  }

  save() {
    fs.writeFileSync('./queue.json',
      JSON.stringify({
        playingContext: this.playingContext,
        queue: this.queue
      }),
      ''
    );
  }

  read() {
    try {
      const data = JSON.parse(fs.readFileSync('./queue.json'));
      this.playingContext = data.playingContext;
      this.queue = data.queue;
    } catch (e) {
      
    }
  }
}

module.exports = QueueManager;