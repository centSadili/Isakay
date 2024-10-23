const express = require('express');
const router = express.Router();
const PersonalDetails = require('../../models/personalDetail');
const RentDetail = require('../../models/rentDetail');

router.get('/user-rent-details/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Check if the user exists
        const personalDetailsList = await PersonalDetails.find({ user: userId });

        if (!personalDetailsList || personalDetailsList.length === 0) {
            return res.status(200).json({ rentDetails: [] }); // Change to 200 with empty array
        }

        let allRentDetails = [];

        for (const personalDetails of personalDetailsList) {
            const rentDetails = await RentDetail.find({ renterID: personalDetails._id })
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
                .exec();

            allRentDetails = allRentDetails.concat(rentDetails);
        }

        // Return the rent details or an empty array
        res.status(200).json({ rentDetails: allRentDetails });

    } catch (err) {
        console.error('Error fetching rent details:', err);
        res.status(500).json({ error: 'Failed to fetch rent details.' });
    }
});


module.exports = router;
