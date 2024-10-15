require('dotenv').config();
const express = require('express')
const connectDB = require('./db.js')
const cors = require('cors')

const loginRoutes  = require('./routes/loginUser')
const regisRoutes  = require('./routes/registerUser')
const getUser = require('./routes/getUser')
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