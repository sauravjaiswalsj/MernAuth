const bcrypt = require('bcrypt');
const User = require('../models/User');
const { validateEmail } = require('../utils/Validator');
const nodemailer = require('nodemailer');

const forgot = async (req, res) => {
    try {
        const { email } = req.body;

        console.log(email);

        if (!validateEmail(email)) {
            return res.status(400).send(`Error: Please enter your correct email`);
        }

        //improves performace
        const userExist = await User.findOne({
            where: {
                email: email,
            },
            attributes: ['username', 'firstName'],
            raw: true, // Return plain object instead of a Sequelize model instance
        });

        if (!userExist) {
            return res.status(403).send(`User does not exist`);
        }

        // User Send Email + User token;
        let randomNum = (Math.floor(Math.random() * 10000)) + userExist.username;
        const token = await bcrypt.hash(randomNum, 5);

        //add token to db
        await User.update({ token: token }, { where: { email: email } });

        // send Mail
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SendBlueEmail,
                pass: process.env.SendBluePassword,
            }
        });
        const resetEmail = `http://localhost:${process.env.Client_Port}/reset?token=${token}`
        const emailStruct = {
            from: `"Auth System" <${process.env.NodeMailerEmail}>`, // sender address
            to: email,
            subject: "Reset Password.", // Subject line
            html: `<p> Hello ${userExist.firstName}, Please verify your email using the link <a href="${resetEmail}"> reset your password. </a></p>`,
            text: `<p> Hello ${userExist.firstName}, Please verify your email using the link <a href="${resetEmail}"> reset your password. </a></p>`,
        };

        transporter.sendMail(emailStruct, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(400).send(`Can not sent the email at this moment ${error}`)
            } else {
                console.log(`Email has been sent:- ${info.response}`);
            }
        });

        return res.status(200).send("Email has been sent.");


        // const user = { username: userExist.username }
        // res.setHeader('Content-Type', 'application/json');
        // res.status(201).json(user);

    } catch (err) {
        console.log(err);
        return res.status(500).send(`Error:${err.message}`);
    }
}

module.exports = forgot;