const express = require('express');
const router = express.Router();

const login = require('../auth/login');
const register = require('../auth/register');
const logout = require('../auth/logout');
//const current = require('../auth/current');

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
//router.get('/current', current);

module.exports = router;
