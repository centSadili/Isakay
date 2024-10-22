const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const crypto = require('crypto');
const path = require('path');
const { Car } = require('./models/car')
require('dotenv').config();

const router = require('express').Router();

// MongoDB URI
const mongoURI = process.env.DB_URI;

// Initialize GridFSBucket
let gridFSBucket;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI);

const conn = mongoose.connection;

// Set up GridFSBucket when the connection is open
conn.once('open', () => {
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
    console.log("GridFSBucket initialized with Mongoose.");
});

// Multer Storage Configuration using GridFsStorage
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            // Generate a random 16-byte hexadecimal filename
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads', // Ensure this matches your GridFSBucket's name
                };
                resolve(fileInfo);
            });
        });
    },
});

// Set up Multer with the defined storage engine
const upload = multer({ storage });

// Route to get an image by filename
router.get('/:filename', async (req, res) => {
    try {
        // Ensure GridFSBucket is initialized
        if (!gridFSBucket) {
            return res.status(500).send({ message: "GridFSBucket is not initialized" });
        }

        // Find the file by filename
        const cursor = gridFSBucket.find({ filename: req.params.filename });

        const files = await cursor.toArray();
        if (!files || files.length === 0) {
            console.log(`File not found: ${req.params.filename}`);
            return res.status(404).send({ message: 'File not found' });
        }

        const file = files[0];
        console.log("File found:", file);

        // Check if the file is an image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            console.log("File is an image, streaming...");
            const readStream = gridFSBucket.openDownloadStreamByName(file.filename);

            readStream.on('error', (err) => {
                console.error("Error during file stream:", err);
                return res.status(500).send({ message: 'Error streaming file', error: err });
            });

            // Pipe the read stream to the response
            readStream.pipe(res);
        } else {
            console.log("File is not an image:", file.contentType);
            return res.status(400).send({ message: 'File is not an image' });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const carId = req.params.id;
        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).send('Car not found');
        }

        // Update car details
        const { car_name, seats, transmission, pickup, dropoff, price, days_availability, status, body_type } = req.body;
        car.car_name = car_name || car.car_name;
        car.body_type = body_type || car.body_type;
        car.seats = seats || car.seats;
        car.status = status || car.status;
        car.transmission = transmission || car.transmission;
        car.pickup = pickup || car.pickup;
        car.dropoff = dropoff || car.dropoff;
        car.price = price || car.price;
        car.days_availability = days_availability || car.days_availability;

        if (status !== undefined) {
            car.status = status === 'true' || status === true; // Ensure it's boolean
        }

        // If a new image is uploaded, update the image field
        if (req.file) {
            const newImageId = req.file.filename; // Assuming req.file.id is the ObjectId of the uploaded image
            
            // Delete the old image from GridFS if it exists
            if (car.image) {
                try {
                    await gridFSBucket.delete(car.image); // Ensure car.image is an ObjectId
                } catch (error) {
                    console.error('Error deleting old image:', error);
                }
            }

            // Set the new image ID
            car.image = newImageId; // Store the new image ID
        }

        // Save the updated car details
        await car.save();

        return res.status(200).send({ message: 'Car updated successfully', car });
    } catch (err) {
        console.error('Error updating car:', err);
        return res.status(500).send({ message: 'Error updating car', error: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const carId = req.params.id;
        
        // Find the car by ID
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).send({ message: 'Car not found' });
        }

        // If the car has an associated image, delete it from GridFS by filename
        if (car.image) {
            try {
                const cursor = gridFSBucket.find({ filename: car.image });
                const files = await cursor.toArray();

                if (!files || files.length === 0) {
                    return res.status(404).send({ message: 'Image not found in GridFS' });
                }

                // Delete the file from GridFS by _id
                const fileId = files[0]._id;
                await gridFSBucket.delete(fileId);

                console.log('Car image deleted from GridFS:', car.image);
            } catch (error) {
                console.error('Error deleting image from GridFS:', error);
                return res.status(500).send({ message: 'Error deleting car image', error: error.message });
            }
        }

        // Delete the car document from the database
        await Car.findByIdAndDelete(carId);

        return res.status(200).send({ message: 'Car and associated image deleted successfully' });
    } catch (err) {
        console.error('Error deleting car:', err);
        return res.status(500).send({ message: 'Error deleting car', error: err.message });
    }
});





// Export the upload middleware and router
module.exports = { upload, gridFSBucket, router };
