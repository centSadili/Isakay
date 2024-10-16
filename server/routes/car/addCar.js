const { upload, gfs } = require('../../gridfs.js');
const router = require('express').Router();
const { Car, validate } = require('../../models/car');

router.post('/submit-car', upload.single('image'), async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
  
    const { car_name, seats, transmission, pickup, dropoff, price, days_availability } = req.body;
  
    const carData = {
      car_name,
      seats,
      transmission,
      pickup,
      dropoff,
      price,
      days_availability,
      image: req.file.filename,
    };
  
    try {
      const newCar = new Car(carData);
      await newCar.save();
      res.status(200).send({ message: 'Car listing added successfully!' });
    } catch (err) {
      console.error("Error saving car listing:", err);
      res.status(500).send({ message: 'Error saving car listing.' });
    }
  });
  module.exports = router;