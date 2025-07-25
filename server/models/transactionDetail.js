const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactDetailsSchema = new Schema({
    paymentDetails: {
        type: Schema.Types.ObjectId,
        ref: 'paymentDetail',
        required: true
    },
    transact_Type: {
        type: String,
        required: true
    },
    transact_No:{
        type: String,
        required: true,
    },
    cardHolder:{
        type: String,
        required: true,
    },
    cardNumber:{
        type: String,
        required: true,
    },
    expDate:{
        type: String,
        required: true,
    },
    cvc:{
        type: String,
        required: true,
    }
    


});

module.exports = mongoose.model("TransactDetails", transactDetailsSchema);
