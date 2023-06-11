const bcrypt = require('bcrypt');
const User = require('../models/User');
const { validateEmail, validatePassword, validateData } = require('../utils/Validator')
const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log(email)
        if (!email) {
            return res.status(400).send('Error: Email is required');
        }

        if (!validateData(firstName, lastName, email, password)) {
            return res.status(400).send(`Invalid details.`);
        }

        const ifUserExist = await User.findOne({
            where: { email },
            raw: true,
        });

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
        const saveData = { firstName: firstName, lastName: lastName, email, password: passwordEncrypt };

        const userCreated = await User.create(saveData);

        console.log(userCreated);

        res.status(201).send("User successfully registered.");
    } catch (err) {
        console.log(err);
        return res.status(500).send(`Error: ${err.message}`);
    }
}

module.exports = signup;