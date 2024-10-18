const router = require('express').Router();
const {Car} = require('../../models/car'); // Make sure to replace this path with your actual Car model path

router.get('/cars', async (req, res) => {
    try {
        const { pickup, dropoff, days_availability } = req.query;

        // Find cars based on the query parameters
        const cars = await Car.find({
            pickup: pickup,
            dropoff: dropoff,
            days_availability: days_availability
        });

        // If no cars are found, return 404
        if (!cars || cars.length === 0) {
            return res.status(404).send({ message: 'Cars not found' });
        }

        // Return the list of cars with a success message
        return res.status(200).send({ message: 'Cars found!', cars: cars });
    } catch (error) {
        // Handle any errors during the request
        return res.status(500).send({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
