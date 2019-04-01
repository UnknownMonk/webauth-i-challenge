const express = require('express');
const helmet = require('helmet');

const userRoutes = require('./users/user-routes');
const registerRoutes = require('./register/register-routes');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/users', userRoutes);
server.use('/api/register', registerRoutes);

server.get('/', (req, res) => {
  res.status(200).json('Home route working');
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Hello darkness my old friend.. Server open on${port}`)
);
