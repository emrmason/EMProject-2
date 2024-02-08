const mongodb = require("../connectDB/connection");
const ObjectId = require("mongodb").ObjectId;

const listMovies = async (req, res, next) => {
  try {
    const client = await mongodb.connectDB();
    const collection = client.db("movies").collection("films");
    const result = await collection.find().toArray();
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send("Couldn't find anything...");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const oneMovie = async (req, res, next) => {
  try {
    const movieID = new ObjectId(req.params.id);
    const client = await mongodb.connectDB();
    const collection = client.db("movies").collection("films");
    const result = await collection.find({ _id: movieID }).toArray();
    if (result.length > 0) {
      res.send(result);
    } else {
      console.log("Couldn't find the movie you're looking for.");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  listMovies,
  oneMovie,
};
