const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for personal details
const personalDetailsSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: false

    },
    firstname:{
        type: String,
        required: true,

    },
    middleinitial:{
        type: String,
        required: false,

    },
    lastname:{
        type: String,
        required: true,

    },
    suffix:{
        type: String,
        required: false,

    },
    gender:{
        type: String,
        required: false,

    },
    birthday:{
        type: String,
        required: true,
        default:Date.now,
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    nationality:{
        type: String,
        required: true,

    }
});

module.exports = mongoose.model('PersonalDetails', personalDetailsSchema);
