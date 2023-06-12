const User = require('../models/User');

const getUser = async (req, res) => {
    const { username } = req.params;
    if (!username) {
        return res.status(400).send('Error: username is required');
    }

    const profile = await User.findOne({
        where: { username: username },
        attributes: ['firstName', 'lastName', 'email', 'username', 'phone', 'designation']
    });

    res.status(200).send(profile);
}

module.exports = getUser;