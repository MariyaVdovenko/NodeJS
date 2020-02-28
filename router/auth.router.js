const express = require('express');
const router = express.Router();

const login = require('../auth/login');
const register = require('../auth/register');
const logout = require('../auth/logout');
const current = require('../auth/current');
const checkToken = require('../middleware/checkToken');

router.post('/login', login);
router.post('/register', register);
router.post('/logout', checkToken, logout);
router.get('/current', checkToken, current);

module.exports = router;
