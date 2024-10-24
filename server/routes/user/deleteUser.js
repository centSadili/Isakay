const router = require('express').Router();
const { User } = require('../../models/user');
const mongoose = require('mongoose');
let gridFSBucket;


const mongoURI = process.env.DB_URI;

mongoose.connect(mongoURI);

const conn = mongoose.connection;

conn.once('open', () => {
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });

    router.delete('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).send('User not found');
            }
            if (!gridFSBucket) {
                return res.status(500).send('GridFSBucket not initialized');
            }
            if (user.image) {
                try {
                    const cursor = gridFSBucket.find({ filename: user.image });
                    const files = await cursor.toArray();

                    if (!files || files.length === 0) {
                        return res.status(404).send({ message: 'Image not found in GridFS' });
                    }


                    const fileId = files[0]._id;
                    await gridFSBucket.delete(fileId);
                } catch (error) {
                    console.error('Error deleting image from GridFS:', error);
                    return res.status(500).send({ message: 'Error deleting user image', error: error.message });
                }
            }

            await User.findByIdAndDelete(id);

            return res.status(200).send({ message: 'User and associated image deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).send({ message: 'Server error while deleting user', error: error.message });
        }
    });
});

module.exports = router;
