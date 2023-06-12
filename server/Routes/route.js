const express = require('express');
const router = express.Router();
const signup = require('../Controllers/signup');
const signin = require('../Controllers/signin');
const reset = require('../Controllers/reset.js');
const updateUser = require('../Controllers/updateUser');
const getUser = require('../Controllers/getUser');

//define routes
router.get('/:username', getUser);
router.post('/signup', signup);
router.post('/signin', signin);
router.put('/update/:username', updateUser);
//router.post('/forget-password', reset);

module.exports = router;