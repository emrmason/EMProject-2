// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// mongoose.connect(process.env.URI);

let _db;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
