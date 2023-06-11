const bcrypt = require('bcrypt');
const User = require('../models/User');
const { Op } = require("sequelize");
const { validateEmail, validatePassword, validateData } = require('../utils/Validator')
const signup = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        console.log(username)
        if (!email) {
            return res.status(400).send('Error: Email is required');
        }

        if (!validateData(firstName, lastName, email, password)) {
            return res.status(400).send(`Invalid details.`);
        }

        const ifUserExist = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (ifUserExist && (username === ifUserExist.username)) {
            return res.status(403).send(`User: ${username} already exists`);
        }

        if (ifUserExist && (email === ifUserExist.email)) {
            return res.status(403).send(`User: ${email} already exists`);
        }

        if (ifUserExist) {
            return res.status(403).send(`User: ${firstName} ${lastName} already exists`);
        }

        if (!validateEmail(email)) {
            return res.status(400).send(`Invalid Email Address.`);
        }

        if (!validatePassword(password)) {
            return res.status(400).send(`Invalid Password Address.`);
        }
        //Encrypt the password.
        const passwordEncrypt = await bcrypt.hash(password, 10);
        const saveData = { firstName: firstName, lastName: lastName, email, username: username, password: passwordEncrypt };

        const userCreated = await User.create(saveData);

        console.log(userCreated);

        res.status(201).send("User successfully registered.");
    } catch (err) {
        console.log(err);
        return res.status(500).send(`Error: ${err.message}`);
    }
}

module.exports = signup;