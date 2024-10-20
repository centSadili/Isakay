const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentDetailsSchema = new Schema({
    paymentDue:{
        type: String,
        required: true,
        default:Date.now,
    },
    amountPayment:{
        type:Number,
        required: true
    },
    paymentStatus:{
        type: Boolean,
        required: true,
        default:false
    }
});

module.exports = mongoose.model("PaymentDetails", paymentDetailsSchema);