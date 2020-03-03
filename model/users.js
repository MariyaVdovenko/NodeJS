const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  subscription: {
    type: String,
    enum: ['free', 'pro', 'premium'],
    default: 'free',
  },
  token: {
    type: String,
    default: null,
  },
});

userSchema.pre('save', function(next) {
  const user = this;

  if (
    (user.password && this.isModified('password')) ||
    (user.password && this.isNew)
  )
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  else return next();
});

userSchema.methods.validatePassword = function(password) {
  const compare = bcrypt.compareSync(password, this.password);
  return compare;
};

userSchema.methods.getJWT = function() {
  const preToken = jwt.sign(
    {
      id: this._id,
    },
    config.secretJwtKey,
    { expiresIn: 60 },
  );

  const token = preToken;
  this.token = token;
  this.save();
  return token;
};

const User = mongoose.model('Users', userSchema, 'users');

module.exports = User;
