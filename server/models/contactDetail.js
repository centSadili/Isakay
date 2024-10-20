const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for contact details
const contactDetailsSchema = new Schema({
    personalDetails: {
        type: Schema.Types.ObjectId,
        ref: 'PersonalDetails',
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true
    },
    phone:{
        type: String,
        required: true,
        maxlength: 12
    },
    telno:{
        type: String,
        required: true,
        maxlength: 12
    },
    emergency:{
        emergencyname:String,
        emergencyno:String

    },
    created:{
        type: Date,
        required: true,
        immutable: true,
        default:Date.now,
    }
});

module.exports = mongoose.model('ContactDetails', contactDetailsSchema);
