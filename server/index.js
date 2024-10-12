require('dotenv').config();
const express = require('express');
const connectDB = require('./db.js')





const app = express()


//Database Connection
connectDB()
// Start the server
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});