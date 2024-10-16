// routes/car/getCars.js
const router = require('express').Router();
const { Car } = require('../../models/car');


router.get('/', async (req, res) => {
    try {
        const cars = await Car.find(); // Fetch all car listings
        res.status(200).json(cars);
    } catch (err) {
        console.error("Error fetching car listings:", err);
        res.status(500).send({ message: 'Error fetching car listings.' });
    }
});

module.exports = router;
