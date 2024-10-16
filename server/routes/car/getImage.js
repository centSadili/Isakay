const router = require('express').Router();
const { gridFSBucket } = require('../../gridfs'); // Adjust the path if necessary

// Helper function to check if the bucket is initialized
const waitForBucketInit = () => {
    return new Promise((resolve, reject) => {
        const checkInterval = setInterval(() => {
            if (gridFSBucket) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100); // Check every 100ms
    });
};

router.get('/:filename', async (req, res) => {
    try {
        

        gridFSBucket.find({ filename: req.params.filename }).toArray((err, files) => {
            if (err) {
                console.error("Error retrieving files:", err);
                return res.status(500).send({ message: 'Error retrieving file', error: err });
            }

            if (!files || files.length === 0) {
                console.log(`File not found: ${req.params.filename}`);
                return res.status(404).send({ message: 'File not found' });
            }

            const file = files[0];
            console.log("File found:", file);

            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                console.log("File is an image, starting stream...");
                const readStream = gridFSBucket.openDownloadStreamByName(file.filename);
                
                readStream.on('error', (err) => {
                    console.error("Read stream error:", err);
                    return res.status(500).send({ message: 'Error reading file', error: err });
                });

                readStream.on('end', () => {
                    console.log("Read stream finished.");
                });

                readStream.pipe(res);
            } else {
                console.log("File is not an image:", file.contentType);
                return res.status(400).send({ message: 'File is not an image' });
            }
        });
    } catch (err) {
        console.error("Caught error:", err);
        res.status(500).send({ message: 'Something went wrong!', error: err.message });
    }
});


module.exports = router;
