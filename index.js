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

server.post('/api/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      // check tha password guess against the database
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/api/register', async (req, res) => {
  try {
    const userInfo = req.body;
    const hash = bcrypt.hashSync(userInfo.password, 4);
    userInfo.password = hash;

    db('users').insert(userInfo);
    res.status(201).json(hash);
  } catch (error) {
    res.status(500).json({ error });
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Hello darkness my old friend.. Server open on${port}`)
);
