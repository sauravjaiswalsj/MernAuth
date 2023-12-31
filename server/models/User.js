const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model { }

User.init({
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
        unique: true, // Add this to ensure uniqueness
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        indexes: [
            {
                unique: true,
                fields: ['username'], // Add an index on the username field
            }
        ]
    },
    email: {
        type: DataTypes.STRING,
        unique: true, // Add this to ensure uniqueness
        allowNull: false, // Add this to enforce email as a required field
        validate: {
            isEmail: true, // Add email format validation
        },
        indexes: [
            {
                unique: true,
                fields: ['email'], // Add an index on the email field
            }
        ]
    },
    password: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.INTEGER,
    },
    designation: {
        type: DataTypes.STRING,
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: ''
    }
}, { sequelize, modelName: "User" }
);

sequelize.sync().then(() => {
    console.log('Tables created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = User;