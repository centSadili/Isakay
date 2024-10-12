const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async ()=>{
    // Database connection
    try{
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log("Connected to the Database!")
    }catch(error){
        console.log(error)
    }


}
module.exports= connectDB