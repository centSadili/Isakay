require('dotenv').config();
const express = require('express')
const connectDB = require('./db.js')
const cors = require('cors')

//rent
const searchCar = require('./routes/rent/searchCar')
//user
const loginRoutes  = require('./routes/user/loginUser.js')
const regisRoutes  = require('./routes/user/registerUser.js')
const getUser = require('./routes/user/getUser.js')
const updateUser =  require('./routes/user/updateUser.js')

//car
const addCar = require('./routes/car/addCar')
const carList = require('./routes/car/carList')
const {router} = require('./gridfs.js')
const getCar = require('./routes/car/getCar')
const app = express()
//Database Connection
connectDB()

//middleware
app.use(express.json())
app.use(cors())

//routes
//user
app.use('/api/loginUser',loginRoutes)
app.use('/api/registerUser',regisRoutes)
app.use('/api/user',getUser)
app.use('/api/user/update',updateUser)

//car
app.use('/api/car/',addCar)
app.use('/api/cars/',carList)
app.use('/api/car_img/',router)
app.use('/api/getcar/',getCar)

//rent
app.use('/api/car/',searchCar)
// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
// Start the server
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});