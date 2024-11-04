const router = require('express').Router();
const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const nodemailer = require('nodemailer');
const authToken = require('../../middleware/auth');
require('dotenv').config()


router.post('/', (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email })
        .then( async user => {
            if (!user) {
                return res.send({ status: "User not found" });
            }
            const token = await authToken.generateResetToken(user);
            console.log(token)

            // Create a test SMTP account from Ethereal for testing
            nodemailer.createTestAccount((err, account) => {
                if (err) {
                    console.error('Failed to create a testing account. ' + err.message);
                    return res.status(500).send({ status: "Failed to create test account" });
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
                    text: `Here is your Reset Password Link  http://localhost:${process.env.PORT}/resetPassword?resetToken=${token}`
                };

                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                        return res.status(500).send({ status: "Failed to send email" });
                    } else {
                        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
                        return res.send({ status: "Success", PreviewURL: nodemailer.getTestMessageUrl(info) });
                    }
                });
            });
            user.resetToken = token
            await User.findOneAndUpdate({email: user.email}, user)
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).send({ status: "Server error" });
        });
});

router.post('/checkToken', async (req, res)=>{
    const token = req.body.token;
    if(!token){
        return res.status(400).send({message: "Invalid Email"})
    }
    else{
        try {
            const validtoken = await authToken.verifyResetToken(token);
            if(!validtoken){
                res.status(400).send("Invalid Token")
            }
            else{
                console.log(validtoken)
                res.status(200).send({message:"Verified Token", email:validtoken.email})
            }
        } catch (error) {
            res.sendStatus(400).send("Internal Server Error")
        }
    }
})

router.post('/reset', async (req,res)=>{
    const {token, pass} = req.body;
    if(!token || !pass){
        res.status(400).send("Missing parameters")
    }
    else{
        try {
            //email
            const email = await authToken.verifyResetToken(token);
            const user = await User.findOne({email: email.email});

            //password
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashedpass = await bcrypt.hash(pass, salt);
            user.resetToken = ""
            user.password = hashedpass

            //update password
            await User.findByIdAndUpdate({_id: email._id}, user)
            res.send(email)
        } catch (error) {
            console.log(error)
            res.status(400).send("Internal Server Error")
        }
    }
})


module.exports = router;
