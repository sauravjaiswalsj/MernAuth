const User = require('../models/User');

const reset = async (req, res) => {
    try {
        const { password } = req.body;
        const token = req.query.token;

        console.log(token);
        const userExist = await User.findOne({
            where: {
                token: token
            }
        });

        if (!userExist) {
            return res.status(403).send(`Token is expired. Please reset password again`);
        }

        const newPassword = await bcrypt.hash(password, 10);

        await User.update({ password: newPassword, token: '' }, {
            where: {
                token: token
            }
        });
        res.status(200).send(`${userExist.username}, password has been successfully changes `);
    } catch (err) {
        console.log(err);
        return res.status(400).send(`Error: ${err.message}`);
    }
}

module.exports = reset;