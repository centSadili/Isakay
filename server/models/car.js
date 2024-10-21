const mongoose = require("mongoose");
const Joi = require('joi');
const carSchema = new mongoose.Schema({
  car_name: {
    type: String,
    required: true,
  },

  seats: { 
    type: Number,
    required: true
  },

  transmission: { 
    type: String, 
    enum: ["manual", "automatic"], 
    required: true 
  },

  pickup: { 
    type: String,
    required: true 
  },

  dropoff: { 
    type: String,
    required: true 
  },

  price: { 
    type: Number,
    required: true 
  },

  days_availability: { 
    type: Number,
    required: true 
  },
  status:{
    type: Boolean,
    default: true,
    required: true,
  },
  image: { 
    type: String, 
    required: true 
  }, 
  
},{timestamps: true });
const validate = (data) => {
    const schema = Joi.object({
        car_name: Joi.string().required().label('Car Name'),
        seats: Joi.number().integer().required().label('Seats'),
        transmission: Joi.string().required().label('Transmission'),
        pickup: Joi.string().required().label('Pickup Location'),
        dropoff: Joi.string().required().label('Dropoff Location'),
        price: Joi.number().integer().required().label('Price'),
        days_availability: Joi.number().integer().required().label('Days Availability'),
        
    });
    return schema.validate(data);
};

   


const Car = mongoose.model("Car", carSchema);

module.exports = {Car,validate};
