const router = require('express').Router();
const { User } = require('../../models/user'); 

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        const { firstName, lastName, email } = user;
        return res.status(200).send({ message: 'Logged In User!', user: { firstName, lastName, email } });
    } catch (error) {
        res.status(500).send({ message: 'Get User Server Error' });
    }
});

module.exports = router;
