require('dotenv').config();
const express = require('express')
const connectDB = require('./db.js')
const cors = require('cors')

const loginRoutes  = require('./routes/user/loginUser.js')
const regisRoutes  = require('./routes/user/registerUser.js')
const getUser = require('./routes/user/getUser.js')
const updateUser =  require('./routes/user/updateUser.js')
const app = express()
//Database Connection
connectDB()

//middleware
app.use(express.json())
app.use(cors())

//routes
app.use('/api/loginUser',loginRoutes)
app.use('/api/registerUser',regisRoutes)
app.use('/api/user',getUser)
app.use('/api/user/update',updateUser)

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