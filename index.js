const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const db = require('./data/dbConfig');
const Users = require('./users/users-model.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json('Home route working');
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Hello darkness my old friend.. Server open on${port}`)
);
