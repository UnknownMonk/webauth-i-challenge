const express = require('express');
const helmet = require('helmet');
const userRoutes = require('./users/user-routes');
const registerRoutes = require('./register/register-routes');
const loginRoutes = require('./login/login');
const logoutRoutes = require('./logout/logoutRoutes');
const session = require('express-session');
const db = require('./data/dbConfig');

const KnexSessionStore = require('connect-session-knex')(session);

const server = express();

const sessionConfig = {
  name: 'jonas',
  secret: 'Shhhhh',
  cookie: {
    maxAge: 1000 * 60 * 15,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,

  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 100 * 60 * 60
  })
};

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));
server.use('/api/users', userRoutes);
server.use('/api/register', registerRoutes);
server.use('/api/login', loginRoutes);
server.use('/api/logout', logoutRoutes);

server.get('/', (req, res) => {
  res.status(200).json('Home route working');
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Hello darkness my old friend.. Server open on${port}`)
);
