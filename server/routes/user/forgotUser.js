const router = require('express').Router();
const {User} = require('../../models/user'); 
const bcrypt = require('bcryptjs');
const Joi = require('joi');


// Not yet Done
router.post('/', async (req, res)=>{
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ message: 'Invalid Email' });
        }
        const token = user.generateResetToken();
        return res.status(200).send({ message: 'Reset Password',token:token, email:user.email });
    } catch (error) {
        res.status(400).send({message: "Invalid Email Address"})
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