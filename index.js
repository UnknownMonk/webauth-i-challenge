const express = require('express');
const helmet = require('helmet');
const userRoutes = require('./users/user-routes');
const registerRoutes = require('./register/register-routes');
const loginRoutes = require('./login/login');
const session = require('express-session');

const server = express();

const sessionConfig = {
  name: 'jonas',
  secret: 'Shhhhh',
  cookie: {
    maxAge: 1000 * 60 * 15,
    secure: false
  },
  httpOnly: true,
  resave: false,
  saveUnitialized: false
};

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));
server.use('/api/users', userRoutes);
server.use('/api/register', registerRoutes);
server.use('/api/login', loginRoutes);

server.get('/', (req, res) => {
  res.status(200).json('Home route working');
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Hello darkness my old friend.. Server open on${port}`)
);
