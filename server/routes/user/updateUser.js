const router = require('express').Router();
const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
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

    // Update the user details
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: {
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        email:req.body.email,
      }}, // Set new values
      { new: true }       // Return the updated document
    );

    res.status(200).send({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update Server Error:", error);
    res.status(500).send({ message: "Update Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
      firstName: Joi.string().required().label('First Name'),
      lastName: Joi.string().required().label('Last Name'),
      email: Joi.string().email().required().label('Email'),
  });
  return schema.validate(data);
};

module.exports = router;
