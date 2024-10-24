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
const getUserList = require('./routes/user/getUserList.js')
const deleteUser = require('./routes/user/deleteUser.js') 
const resetpass = require('./routes/user/forgotUser.js')
//car
const addCar = require('./routes/car/addCar')
const carList = require('./routes/car/carList')
const {router} = require('./gridfs.js')
const getCar = require('./routes/car/getCar')

//rent
const RentDetail = require('./routes/rent/addRent')
const getUserRent = require('./routes/rent/getUserRent')
const deleteRent = require('./routes/rent/deleteRent')
const carlist = require('./routes/rent/rentList.js')
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
app.use('/api/user/delete',deleteUser)
app.use('/api/users/',getUserList)
app.use('/api/resetpassword', resetpass)

//car
app.use('/api/car/',addCar)
app.use('/api/cars/',carList)
app.use('/api/car_img/',router)
app.use('/api/getcar/',getCar)
app.use('/api/updatecar/',router)
app.use('/api/deletecar/',router)
//rent
app.use('/api/car/',searchCar)
app.use('/api/rentcar/',RentDetail)
app.use('/api/user/',getUserRent)
app.use('/api/rent/',deleteRent)
app.use('/api/rents/',carlist)
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