const { validateEmail, validatePassword, validateData } = require('../utils/Validator');
const User = require('../models/User');

const updateUser = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) {
            return res.status(400).send('Error: username is required');
        }
        const { firstName, lastName, phone, designation } = req.body;

        // Construct the updated user data object
        const updatedUserData = {
            firstName,
            lastName,
            phone,
            designation
        };

        console.log(updatedUserData);

        const [rowsAffected] = await User.update(updatedUserData, {
            where: {
                username: username,
            },
            raw: true, // Return plain object instead of a Sequelize model instance
        });

        if (rowsAffected === 0) {
            return res.status(404).send('User not found');
        }
        const user = await User.findOne({
            where: { username: username },
            attributes: ['firstName', 'lastName', 'email', 'username', 'phone', 'designation'],
            raw: true
        })
        return res.status(201).send(user);

    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).send('Internal Server Error');
    }
};
module.exports = updateUser;