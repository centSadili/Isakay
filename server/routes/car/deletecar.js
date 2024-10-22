const router = require('express').Router();
const {Car} = require('../../models/car');

router.delete('/deleteCar/:id', async (req, res) => {
    try {
        const deleteCar = await Car.findByIdAndDelete(req.params.id)
        console.log(deleteCar);
        
        return res.status(500).send({message: "Successfully Deleted"})
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: "Error: "+error})
    }
})

module.exports = router;