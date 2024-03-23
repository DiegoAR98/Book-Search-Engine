const mongoose = require('mongoose');

//include your MongoDB Atlas connection string
const connString = process.env.MONGODB_URI;

if (!connString) {
  console.error('MongoDB connection string is not set in environment variables');
  process.exit(1);
}

mongoose.connect(connString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected successfully.'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;
