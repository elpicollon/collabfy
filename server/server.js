const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const auth = require('./auth');
const api = require('./api');

nextApp.prepare().then(() => {
  app.use(compression());
  app.use(cookieParser());
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  app.use(
    bodyParser.json({
      limit: 1024
    })
  );

  app.use('/auth', auth);
  app.use('/api', api(io));

  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(process.env.PORT || 3000, err => {
    if (err) throw err;
  });
});
