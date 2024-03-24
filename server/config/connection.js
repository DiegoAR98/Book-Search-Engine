const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI);


module.exports = mongoose.connection;
