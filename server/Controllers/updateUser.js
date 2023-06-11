const { validateEmail, validatePassword, validateData } = require('../utils/Validator');
const User = require('../models/User');

const updataUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, designation } = req.body;
        const userExist = await User.update({

            where: {
                email: email,
            },
            raw: true, // Return plain object instead of a Sequelize model instance
        });
    } catch (e) {

    }
}

module.exports = updataUser;