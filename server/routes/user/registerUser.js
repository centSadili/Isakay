const router = require('express').Router();
const { User, validate } = require('../../models/user');
const bcrypt = require('bcryptjs');
const { upload } = require('../../gridfs.js');

router.post('/', upload.single('image'), async (req, res) => {
    // Validate the request body
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) return res.status(409).send({ message: 'User with given Email Already Exists' });

        // Ensure an image file was uploaded
        if (!req.file) return res.status(400).send({ message: 'Image is required' });

        // Hash the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create user data
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            admin: req.body.admin || false, // Default admin to false if not provided
            image: req.file.filename, // Save image filename from multer
        };

        // Save the new user
        const newUser = new User(userData);
        await newUser.save();

        res.status(201).send({ message: 'User Created Successfully!' });
    } catch (error) {
        console.error('Register Server Error:', error);
        res.status(500).send({ message: 'Register Server Error' });
    }
});

module.exports = router;
