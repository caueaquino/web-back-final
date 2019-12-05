const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const auth = require('../util/auth');

router.post('/', auth.optional, UserController.register);

router.post('/login', auth.optional, UserController.login);

router.get('/', auth.optional, UserController.index);

router.get('/logout', auth.optional, UserController.logout);

module.exports = router;
