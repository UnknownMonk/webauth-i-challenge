const user = require('express').Router();
const globalR = require('../globalR');
const Users = require('../users/users-model.js');

user.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function restricted(req, res, next) {
  if (req.session && req.session.username) {
    // Users.findBy({ username })
    //   .first()
    //   .then(user => {
    //     // check tha password guess against the database
    //     if (user && bcrypt.compareSync(password, user.password)) {
    //       next();
    //     } else {
    //       res.status(401).json({ message: 'You shall not pass!!' });
    //     }
    //   })
    next().catch(error => {
      res.status(500).json(error);
    });
  } else {
    res.status(401).json({ message: 'Please provide credentials' });
  }
}

// user.get('/restricted/18andUp', globalR, (req, res) => {
//   Users.find()
//     .then(users => {
//       res.json(users);
//     })
//     .catch(err => res.send(err));
// });

module.exports = user;
