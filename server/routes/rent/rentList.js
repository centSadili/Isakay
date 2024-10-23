const express = require('express');
const router = express.Router();
const PersonalDetails = require('../../models/personalDetail');
const RentDetail = require('../../models/rentDetail');

router.get('/user-rent-details/', async (req, res) => {
    try {
        // Fetch all personal details
        const personalDetailsList = await PersonalDetails.find();

        // If no personal details exist, return 404
        if (!personalDetailsList || personalDetailsList.length === 0) {
            return res.status(404).json({ message: 'No personal details found', rentDetails: [] });
        }

        // Use Promise.all to fetch rent details in parallel
        const allRentDetails = await Promise.all(
            personalDetailsList.map(async (personalDetails) => {
                return RentDetail.find({ renterID: personalDetails._id })
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
                    });
            })
        );

        // Flatten the array and return results
        const flatRentDetails = allRentDetails.flat();

        res.status(200).json({ rentDetails: flatRentDetails });

    } catch (err) {
        console.error('Error fetching rent details:', err);
        res.status(500).json({ error: 'Failed to fetch rent details.' });
    }
});

module.exports = router;
