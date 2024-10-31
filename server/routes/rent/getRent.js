const express = require('express');
const router = express.Router();
const RentDetail = require('../../models/rentDetail'); 
const ContactDetail = require('../../models/contactDetail')

// Route to get rent details by rentID
router.get('/get-rent/:rentId', async (req, res) => {
    try {
        const { rentId } = req.params;

        // Find the rent details by rentId and populate related documents
        const rentDetails = await RentDetail.findById(rentId)
        .populate({
            path: 'renterID',
            model: 'PersonalDetails',
        })
        .populate({
            path: 'carID',
            model: 'Car',
        })
        .populate({
            path: 'transactionID',
            model: 'TransactDetails',
        })
        const contactDetail = await ContactDetail.findOne({personalDetails:rentDetails.renterID})
        console.log(contactDetail)
        if (!rentDetails) {
            return res.status(404).json({ error: 'Rent details not found' });
        }
        if (!contactDetail) {
            return res.status(404).json({ error: 'Contact details not found' });
        }
        res.status(200).json({rentDetails,contactDetail});
    } catch (err) {
        console.error('Error retrieving rent details:', err);
        res.status(500).json({ error: 'Failed to retrieve rent details.' });
    }
});

module.exports = router;