const express = require('express');
const router = express.Router();
const PersonalDetails = require('../../models/personalDetail'); 
const ContactDetail = require('../../models/contactDetail'); 
const TransactionDetail = require('../../models/transactionDetail');
const RentDetail = require('../../models/rentDetail'); 
const PaymentDetail = require('../../models/paymentDetail'); 

router.delete('/delete-rent-details/:rentId', async (req, res) => {
    try {
        const { rentId } = req.params;

        // Find and delete rent details by rent ID
        const rentDetail = await RentDetail.findByIdAndDelete(rentId);
        if (!rentDetail) {
            return res.status(404).json({ message: 'Rent details not found' });
        }

        // Find and delete the associated transaction details
        const transactionDetail = await TransactionDetail.findByIdAndDelete(rentDetail.transactionID);
        if (transactionDetail) {
            // Find and delete the associated payment details
            await PaymentDetail.findByIdAndDelete(transactionDetail.paymentDetails);
        }

        // Find and delete the personal details using the renter ID
        const personalDetail = await PersonalDetails.findByIdAndDelete(rentDetail.renterID);
        if (personalDetail) {
            // Find and delete the associated contact details
            await ContactDetail.findOneAndDelete({ personalDetails: personalDetail._id });
        }

        res.status(200).json({ message: 'Rent details and associated records deleted successfully' });
    } catch (err) {
        console.error('Error deleting rent details:', err);
        res.status(500).json({ error: 'Failed to delete rent details.' });
    }
});


module.exports = router;
