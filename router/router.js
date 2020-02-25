const express = require('express');
const router = express.Router();
const authRouter = require('./auth.router');
const contactsRouter = require('./contactsRouter');
const checkToken = require('../middleware/checkToken');

router.use('/auth', authRouter);
router.use('/contacts', checkToken, contactsRouter);

module.exports = router;
