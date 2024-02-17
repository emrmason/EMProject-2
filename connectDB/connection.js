const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.DB_URL);
console.log("DB Connected!");

// Close Mongoose connection on SIGINT (Ctrl+C)
process.on("SIGINT", function () {
  mongoose.connection.close();
  console.log("The way is shut.");
  process.exit(0);
});

const connectDB = mongoose.connection;

module.exports = { connectDB };
