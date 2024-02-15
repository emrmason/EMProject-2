const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// const connectDB = async () => {
//   try {
//     const dbName = "movies";
//     connectionURL = process.env.DB_URL + dbName;
//     await mongoose.connect(connectionURL);
//     console.log("Connected to MongoDB");
//     const db = mongoose.connection.db;
//     console.log("Available Collections:", await db.listCollections().toArray());
//   } catch (error) {
//     console.log(error);
//   }
// };

const connectDB = async () => {
  try {
    const dbName = "movies";
    const connectionURL = process.env.DB_URL + dbName;
    await mongoose.connect(connectionURL);

    console.log("Connected to MongoDB");

    // Use mongoose.connection.db to access the MongoDB database object
    const db = mongoose.connection.db;

    // Check if collections exist before listing them
    const collections = await db.listCollections().toArray();

    if (collections.length > 0) {
      console.log("Available Collections:", collections);
    } else {
      console.log("No collections found in the database.");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = { connectDB };
