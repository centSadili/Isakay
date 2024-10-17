const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const crypto = require('crypto');
const path = require('path');
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

// Export the upload middleware and router
module.exports = { upload, gridFSBucket, router };
