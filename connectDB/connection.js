const { MongoClient } = require("mongodb");

let _db;

const connectDB = async () => {
  const URI = process.env.DB_URL;
  const client = new MongoClient(URI);
  try {
    await client.connect();
    _db = client;
    console.log("Connected to your movie house");
  } catch (error) {
    console.log(error);
  }
  return _db;
};

module.exports = { connectDB };
