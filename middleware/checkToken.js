const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Users = require('../model/users');

module.exports = async (req, res, next) => {
  const headerToken = req.headers['authorization'];

  if (headerToken) {
    const token = headerToken.split('Bearer ')[1];
    try {
      const validToken = jwt.verify(token, config.secretJwtKey);

      if (validToken) {
        const user = await Users.findOne({ _id: validToken.id });
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: 'Not authorized' });
      }
    } catch (err) {
      res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
};
