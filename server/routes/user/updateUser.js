const router = require('express').Router();
const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const { upload} = require('../../gridfs.js');
// Update user details
router.put('/:id', upload.single('image'), async (req, res) => {
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
    const { firstName, lastName, email} = req.body;
   
          user.firstName=firstName || user.firstName
          user.lastName=lastName || user.lastName
          user.email=email || user.email
            // If a new image is uploaded, update the image field
            if (req.file) {
              const newImageId = req.file.filename; // Assuming req.file.id is the ObjectId of the uploaded image
              
              // Delete the old image from GridFS if it exists
              if (user.image) {
                  try {
                      await gridFSBucket.delete(user.image); // Ensure car.image is an ObjectId
                  } catch (error) {
                      console.error('Error deleting old image:', error);
                  }
              }
  
              // Set the new image ID
              user.image = newImageId; // Store the new image ID
          }
    await user.save();
    res.status(200).send({ message: "User updated successfully", user: user });
  } catch (error) {
    console.error("Update Server Error:", error);
    res.status(500).send({ message: "Update Server Error" });
  }
});
router.post('/changePass', async (req,res)=>{
  try {
    const {CurrentPass,NewPass, email} = req.body
    const user = await User.findOne({email: email})
    const currentPass = await bcrypt.compare(CurrentPass, user.password);
    if(!currentPass){
      return res.status(401).send({message: "Invalid Current Password!"})
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPass = await bcrypt.hash(NewPass, salt);
    user.password = hashedPass;
    await user.save();
    return res.status(200).send({message: "Password Changed Successfully"})
  } catch (error) {
    res.status(400).send(error)
    console.error(error)
    console.log("Hello")
  }
  
})

const validate = (data) => {
  const schema = Joi.object({
      firstName: Joi.string().required().label('First Name'),
      lastName: Joi.string().required().label('Last Name'),
      image: Joi.string().label('Image'),
      email: Joi.string().email().required().label('Email'),
  });
  return schema.validate(data);
};

module.exports = router;
