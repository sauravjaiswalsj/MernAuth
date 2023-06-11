const bcrypt = require('bcrypt');
const User = require('../models/User');
const { validateEmail } = require('../utils/Validator');

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        if (!validateEmail(email)) {
            return res.status(400).send(`Error: Please enter your correct email`);
        }

        // const userExist = await User.findOne({
        //     where: { email: email }
        // });
        //improves performace
        const userExist = await User.findOne({
            where: {
                email: email,
            },
            attributes: ['firstName', 'lastName', 'password'],
            raw: true, // Return plain object instead of a Sequelize model instance
        });

        if (!userExist) {
            return res.status(403).send(`User does not exist`);
        }

        //validate password
        const passMatch = await bcrypt.compare(password, userExist.password);

        if (!passMatch) {
            return res.status(400).send(`Error: Incorrect Password`);
        }
        const user = { firstName: userExist.firstName, lastName: userExist.lastName, email: email }
        console.log(typeof (user));
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).send(`Error:${err.message}`);
    }
}

module.exports = signin;