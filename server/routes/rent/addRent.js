const express = require('express');
const router = express.Router();
const PersonalDetails = require('../../models/personalDetail'); 
const ContactDetail = require('../../models/contactDetail'); 
const TransactionDetail = require('../../models/transactionDetail');
const RentDetail = require('../../models/rentDetail'); 
const PaymentDetail = require('../../models/paymentDetail'); 

router.post('/add-rent-details', async (req, res) => {
    try {
        console.log(req.body);
        
        
        const personalDetailsDoc = new PersonalDetails({
            user: req.body.userId, 
            firstname: req.body.firstname,
            middleinitial: req.body.middleinitial,
            lastname: req.body.lastname,
            suffix: req.body.suffix,
            gender: req.body.gender,
            birthday: new Date(req.body.birthday),
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode,
                country: req.body.country
            },
            nationality: req.body.nationality
        });
        const savedPersonalDetails = await personalDetailsDoc.save();

        // Saving contact details
        const contactDetailsDoc = new ContactDetail({
            personalDetails: savedPersonalDetails._id,
            email: req.body.email,
            phone: req.body.phone,
            telno: req.body.telno,
            emergency: {
                emergencyname: req.body.emergencyname,
                emergencyno: req.body.emergencyno
            },
        });
        await contactDetailsDoc.save();

        // Saving payment details
        const paymentDetailsDoc = new PaymentDetail({
            amountPayment: req.body.amountOfPayment,
            paymentStatus: true 
        });
        await paymentDetailsDoc.save();

        // Saving transaction details
        const transactionDetailsDoc = new TransactionDetail({
            paymentDetails: paymentDetailsDoc._id,
            transact_Type: req.body.transact_Type,
            cardHolder:req.body.cardHolder,
            cardNumber:req.body.cardNumber,
            expDate:req.body.expDate,
            cvc:req.body.cvc,
            transact_No: new Date().toISOString() + paymentDetailsDoc._id
        });
        await transactionDetailsDoc.save();

        //Saving rent details
        const rentDetail = new RentDetail({
            renterID: savedPersonalDetails._id,
            carID: req.body.carID,
            transactionID: transactionDetailsDoc._id,
            pickUpDate: new Date(req.body.pickUpDate) 
        });
        await rentDetail.save();


        res.status(201).json({ message: 'Rent details added successfully' });

    } catch (err) {
        console.error('Error saving rent details:', err);
        res.status(500).json({ error: 'Failed to save rent details.' });
    }
});

module.exports = router;
