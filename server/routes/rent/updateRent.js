const express = require('express');
const router = express.Router();
const PersonalDetails = require('../../models/personalDetail'); 
const ContactDetail = require('../../models/contactDetail'); 
const TransactionDetail = require('../../models/transactionDetail');
const RentDetail = require('../../models/rentDetail'); 
const PaymentDetail = require('../../models/paymentDetail'); 

// Update route for rent details
router.put('/update-rent-details/:rentId', async (req, res) => {
    try {
        const { rentId } = req.params;
        
        // Find rent details by rentId
        const rentDetails = await RentDetail.findById(rentId);
        if (!rentDetails) return res.status(404).json({ error: 'Rent details not found' });

        const userId = rentDetails.renterID;
        const x = await PersonalDetails.find({ _id: userId });
        console.log('Personal Details Found:', x);
        // Update personal details
        const personalDetails = await PersonalDetails.findOneAndUpdate(
            { _id: userId },
            {
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
            },
            { new: true }
        );

        if (!personalDetails) return res.status(404).json({ error: 'Personal details not found' });

        // Update contact details
        const contactDetails = await ContactDetail.findOneAndUpdate(
            { personalDetails: personalDetails._id },
            {
                email: req.body.email,
                phone: req.body.phone,
                telno: req.body.telno,
                emergency: {
                    emergencyname: req.body.emergencyname,
                    emergencyno: req.body.emergencyno
                }
            },
            { new: true }
        );

        if (!contactDetails) return res.status(404).json({ error: 'Contact details not found' });

        // Retrieve transaction details using the userId
        const transactionDetails = await TransactionDetail.findOne({ _id: rentDetails.transactionID });
        if (!transactionDetails) return res.status(404).json({ error: 'Transaction details not found' });

        // Update payment details using the payment ID found in transaction details
        const paymentDetails = await PaymentDetail.findByIdAndUpdate(
            transactionDetails.paymentDetails,
            { amountPayment: req.body.amountOfPayment },
            { new: true }
        );

        if (!paymentDetails) return res.status(404).json({ error: 'Payment details not found' });

        // Update transaction details
        await TransactionDetail.findByIdAndUpdate(
            transactionDetails._id,
            {
                transact_Type: req.body.transact_Type,
                cardHolder: req.body.cardHolder,
                cardNumber: req.body.cardNumber,
                expDate: req.body.expDate,
                cvc: req.body.cvc
            },
            { new: true }
        );

        // Update rent details with the provided rentId
        await RentDetail.findByIdAndUpdate(
            rentId,
            {
                carID: req.body.carID,
                transactionID: transactionDetails._id,
                pickUpDate: new Date(req.body.pickUpDate)
            },
            { new: true }
        );

        res.status(200).json({ message: 'Rent details updated successfully' });

    } catch (err) {
        console.error('Error updating rent details:', err);
        res.status(500).json({ error: 'Failed to update rent details.' });
    }
});

module.exports = router;
