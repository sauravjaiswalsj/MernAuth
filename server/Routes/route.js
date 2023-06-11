const express = require('express');
const router = express.Router();
const signup = require('../Controllers/signup');
const signin = require('../Controllers/signin');
const reset = require('../Controllers/reset.js');
const updataUser = require('../Controllers/updateUser');
// const sequelize = require('../config/db');

// sequelize.sync().then(() => {
//     console.log('Tables created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table : ', error);
// });

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/updateUser', updataUser);
//router.post('/forget-password', reset);


module.exports = router;