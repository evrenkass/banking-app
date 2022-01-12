const mongoose = require("mongoose");

const DEFAULT_MONGODB_URI = "mongodb://localhost:27017/banking";
const connection = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

const connectDb = () => {
  return mongoose.connect(connection);
};

module.exports = connectDb;
