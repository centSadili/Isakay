const router = require('express').Router();
const { User} = require('../../models/user'); // Ensure you're importing 'validate'
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const authToken = require('../../middleware/auth')

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ message: 'Invalid Email' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send({ message: 'Invalid Password' });
        }

        const token = authToken.generateAuthToken();
        return res.status(200).send({ message: 'Logged In Successfully!',token:token, userId:user._id,admin:user.admin });

    } catch (error) {
        res.status(500).send({ message: 'Login Server Error' });
    }
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
        admin: Joi.boolean().label('Admin'),
	});
	return schema.validate(data);
};

module.exports = router;
