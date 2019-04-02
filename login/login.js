const login = require('express').Router();
const bcrypt = require('bcrypt');
const Users = require('../users/users-model.js');

login.post('/', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      // check tha password guess against the database
      if (user && bcrypt.compareSync(password, user.password)) {
        res
          .status(200)
          .json({ message: `Welcome ${user.username}!eat this cookie` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = login;
