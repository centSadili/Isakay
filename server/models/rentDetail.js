const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentDetailsSchema = new Schema({
    renterID: {
        type: Schema.Types.ObjectId,
        ref: 'personalDetail',
        required: true
    },
    carID: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    transactionID: {
        type: Schema.Types.ObjectId,
        ref: 'TransactionDetails',
        required: true
    },
    pickUpDate:{
        type: String,
        required: true,
        default:Date.now,
        
    },
    rentStatus:{
        type:Boolean,
        default: true,
        required: true,
    },
    rentDate:{
        type: Date,
        required: true,
        immutable: true,
        default:Date.now,
        
    }
});

module.exports = mongoose.model("RentDetails", rentDetailsSchema);