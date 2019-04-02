const user = require('express').Router();
const globalR = require('../globalR');
const Users = require('../users/users-model.js');

user.get('/', globalR, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function restricted(req, res, next) {
  try {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(400).json({ message: 'No credentials provided' });
    }
  } catch (error) {
    res.status(500).json('Problem with the cookie');
  }
}

user.get('/restricted/18andUp', globalR, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = user;
