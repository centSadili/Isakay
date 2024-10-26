const router = require('express').Router();
const { User } = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const nodemailer = require('nodemailer');
require('dotenv').config()


router.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).send({ Status: "User not found" });
            }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

            // Create a test SMTP account from Ethereal for testing
            nodemailer.createTestAccount((err, account) => {
                if (err) {
                    console.error('Failed to create a testing account. ' + err.message);
                    return res.status(500).send({ Status: "Failed to create test account" });
                }

                // Set up transporter using Ethereal's SMTP service
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass
                    }
                });

                // Email content and recipient details
                const mailOptions = {
                    from: '"ISAKAY Support" <support@isakay.com>', // Sender info
                    to: email,
                    subject: 'Reset Password Link',
                    text: `hello ${email}`
                };

                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                        return res.status(500).send({ Status: "Failed to send email" });
                    } else {
                        console.log('Message sent:', info.messageId);
                        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
                        return res.send({ Status: "Success", PreviewURL: nodemailer.getTestMessageUrl(info) });
                    }
                });
            });
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).send({ Status: "Server error" });
        });
});
module.exports = router;
