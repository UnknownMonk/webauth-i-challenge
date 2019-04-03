const logout = require('express').Router();

logout.get('/', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send('you can checkout any time you like,');
      } else {
        res.send('bye');
      }
    });
  } else {
    res.end();
  }
});

module.exports = logout;
