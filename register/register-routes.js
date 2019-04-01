const register = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../data/dbConfig');
register.post('/', async (req, res) => {
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

module.exports = register;
