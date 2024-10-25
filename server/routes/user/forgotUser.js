const router = require('express').Router();
const {User} = require('../../models/user'); 
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const nodemailer = require('nodemailer')


// Not yet Done
router.post('/', async (req, res)=>{
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ message: 'Email Not found' });
        }
        const token = user.generateResetToken();
        // await User.findOneAndUpdate({email: req.body.email}, user)
        console.log("Token: "+token)

        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.ethereal.email',
        //     port:587,
        //     auth: {
        //         user: process.env.user,
        //         pass: process.env.pass
        //     }
        // })
        // async ()=>{
        //     const info = await transporter.sendMail({
        //         from:process.env.user,
        //         to:useremail.email,
        //         subject:"Forgot password Code Link",
        //         text:`http://localhost:3000/api/resetpassword${user._id}/${token}`
        
        //     }, (err)=>{
        //         if(err){
        //             console.log(err)
        //         }
        //         else{
        //             return res.sendStatus(200)
        //         }
        //     })
        //     console.log(info.messageId)
        // }
        return res.status(200).send({ message: 'Check your email for the link, you may now close this window',token:token, email:user.email });
    } catch (error) {
        res.status(400).send({message: error})
        console.log(error)
    }
})

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email")
	});
	return schema.validate(data);
};

module.exports = router;
