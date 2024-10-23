const router = require('express').Router();
const { User } = require('../../models/user'); 

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ message: 'Get User Server Error' });
    }
});

module.exports = router;