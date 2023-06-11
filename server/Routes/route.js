const express = require('express');
const router = express.Router();
const signup = require('../Controllers/signup');
const signin = require('../Controllers/signin');
const reset = require('../Controllers/reset.js');
const updataUser = require('../Controllers/updateUser');

//define routes
router.post('/signup', signup);
router.post('/signin', signin);
router.put('/updateUser', updataUser);
//router.post('/forget-password', reset);

module.exports = router;