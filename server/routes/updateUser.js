const router = require('express').Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcryptjs');

// Update user details
router.put('/:id', async (req, res) => {
  try {
    // Validate the incoming data
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Find the user by ID from the URL params
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if the email is changing and if the new email is unique
    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).send({ message: "Email already in use" });
      }
    }

    // If password is provided, hash it before updating
    if (req.body.password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // Update the user details
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: {
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        email:req.body.email,
        password:req.body.password
      }}, // Set new values
      { new: true }       // Return the updated document
    );

    res.status(200).send({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update Server Error:", error);
    res.status(500).send({ message: "Update Server Error" });
  }
});

module.exports = router;
