const express = require('express');
const router = express.Router();
const signup = require('../Controllers/signup');
const signin = require('../Controllers/signin');
const forgot = require('../Controllers/forgot');
const reset = require('../Controllers/reset');
const updateUser = require('../Controllers/updateUser');
const getUser = require('../Controllers/getUser');

//define routes
router.get('/:username', getUser);
router.post('/signup', signup);
router.post('/signin', signin);
router.put('/update/:username', updateUser);
router.post('/forgot', forgot);
router.post('/reset', reset);

module.exports = router;