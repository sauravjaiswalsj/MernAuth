const { Sequelize } = require('sequelize');

const user = process.env.user;
const password = process.env.password;

const createDb = new Sequelize("Auth-system", user, password, {
    dialect: "sqlite",
    host: "./config/auth.sqlite"
});

module.exports = createDb;
