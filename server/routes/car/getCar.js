const router = require('express').Router();
const {Car} = require('../../models/car');

router.get('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).send('Car not found');
        }
        const {car_name,seats,transmission,pickup,dropoff,price,days_availability,image} = car;

        return res.status(200).send({ message: 'The Car', car: { car_name,seats,transmission,pickup,dropoff,price,days_availability,image } });
    }catch(err){
        res.status(500).send({ message: 'Get Car Server Error' });
    }
})

module.exports = router;
