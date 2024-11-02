const router = require('express').Router();
const jwt = require('jsonwebtoken');

const generateAuthToken = ()=>{
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
}

const generateResetToken = (user)=>{
    return jwt.sign({email: user.email, _id:user.id}, process.env.JWT_SECRET, {expiresIn: '1hr'});
}

const verifyResetToken = async (token)=>{
    return new Promise((res, rej)=>{
        jwt.verify(token, process.env.JWT_SECRET, async (err, email)=>{
            if(err){
                res(false)
            }
            else{
                try {
                    res(email)
                } catch (error) {
                    console.log(error)
                    console.error(error)
                    res(false)
                }
            }
    }) 
    })
}


module.exports = {generateAuthToken, generateResetToken, verifyResetToken}