const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
        required: true,
    },
    image: { 
        type: String, 
        required: true 
      }, 
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
    resetToken:{
        type: String,
        default:""
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
    return token;
};
userSchema.methods.generateResetToken = ()=>{
    return jwt.sign({email: this.email}, process.env.JWT_SECRET, {expiresIn: '1hr'});
}


// verifies Reset Token
userSchema.methods.verifyResetToken = (token)=>{
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if(err){
            return false;
        }
        try {
            return decoded.email

        } catch (error) {
            return false
        }
    })
}

const User = mongoose.model('User', userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label('First Name'),
        lastName: Joi.string().required().label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
        admin: Joi.boolean().label('Admin'),
        image: Joi.string().label('Image'),
    });
    return schema.validate(data);
};

module.exports = { User, validate };
