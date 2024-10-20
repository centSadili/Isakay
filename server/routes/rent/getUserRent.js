const express = require('express');
const router = express.Router();
const PersonalDetails = require('../../models/personalDetail');
const RentDetail = require('../../models/rentDetail');

router.get('/user-rent-details/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find all personal details of the user (assuming user can have multiple personal details)
        const personalDetailsList = await PersonalDetails.find({ user: userId });

        if (!personalDetailsList || personalDetailsList.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        let allRentDetails = [];

        // Loop through all personalDetails entries to find all associated rent details
        for (const personalDetails of personalDetailsList) {
            const rentDetails = await RentDetail.find({ renterID: personalDetails._id })
                .populate({
                    path: 'renterID',
                    model: 'PersonalDetails', // Ensure this is the correct model name
                })
                .populate({
                    path: 'carID',
                    model: 'Car', // Ensure this is the correct model name
                })
                .populate({
                    path: 'transactionID',
                    model: 'TransactDetails', // Correct model name
                })
                .exec();

            allRentDetails = allRentDetails.concat(rentDetails);
        }

        // If no rent details found for any personalDetails
        if (allRentDetails.length === 0) {
            return res.status(404).json({ error: 'No rent details found for the user' });
        }

        // Return all rent details along with personal details
        res.status(200).json({
            personalDetails: personalDetailsList,
            rentDetails: allRentDetails,
        });

    } catch (err) {
        console.error('Error fetching rent details:', err);
        res.status(500).json({ error: 'Failed to fetch rent details.' });
    }
});

module.exports = router;
