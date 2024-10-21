const router = require('express').Router();
const { Car } = require('../../models/car');
const { upload, gridFSBucket } = require('../../gridfs'); // Ensure this points to your GridFS setup

// Route to update car details and optionally update image
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const carId = req.params.id;
        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).send('Car not found');
        }

        // Update car details
        const { car_name, seats, transmission, pickup, dropoff, price, days_availability } = req.body;
        car.car_name = car_name || car.car_name;
        car.seats = seats || car.seats;
        car.transmission = transmission || car.transmission;
        car.pickup = pickup || car.pickup;
        car.dropoff = dropoff || car.dropoff;
        car.price = price || car.price;
        car.days_availability = days_availability || car.days_availability;

        // If a new image is uploaded, update the image field
        if (req.file) {
            const newImageFilename = req.file.filename;
            
            // Delete the old image from GridFS (optional, based on your app's needs)
            if (car.image) {
                await gridFSBucket.delete(car.image);
            }

            // Set the new image filename
            car.image = newImageFilename;
        }

        // Save the updated car details
        await car.save();

        return res.status(200).send({ message: 'Car updated successfully', car });
    } catch (err) {
        console.error('Error updating car:', err);
        return res.status(500).send({ message: 'Error updating car', error: err.message });
    }
});

// Export the router
module.exports = router;
