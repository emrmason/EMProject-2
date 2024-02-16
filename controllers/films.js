const mongoose = require("mongoose");
const { connectDB } = require("../connectDB/connection");
const { ObjectId } = require("mongoose");

// connectDB();

// const getCollection = async (base, collectionName) => {
//   return mongoose.connection.db(base).collection(collectionName);
// };

// const getQuery = async (collection, query) => {
//   return collection.find(query).toArray();
// };

const listFilms = async (req, res, next) => {
  try {
    const collection = mongoose.connection.collection("films");
    const result = await collection.find({}).toArray();
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

const oneFilm = async (req, res, next) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const collection = await mongoose.connection
      .db("movies")
      .collection("films");
    const result = await collection.find({ _id: movieId }).toArray();
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send("Couldn't find the movie you're looking for.");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const newFilm = async (req, res) => {
  try {
    const collection = await mongoose.connection
      .db("movies")
      .collection("films");
    const newFilm = {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      rating: req.body.rating,
      actors: req.body.actors,
      category: req.body.category,
      director: req.body.director,
      length: req.body.length,
    };
    const result = await collection.insertOne(newFilm);
    res.status(201).send(`Insterted movie with _id: ${result.insertedId}`);
  } catch (error) {
    console.error("Houston we have a problem: ", error);
  } finally {
    await client.close();
    console.log("The way is shut.");
  }
};

const updateFilm = async (req, res) => {
  try {
    const filmId = new ObjectId(req.params.id);
    const collection = mongoose.connection.db.collection("films");
    const filter = { _id: filmId };
    const update = {
      $set: {
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        rating: req.body.rating,
        actors: req.body.actors,
        category: req.body.category,
        director: req.body.director,
        length: req.body.length,
      },
    };
    await collection.findOneAndUpdate(filter, update);
    res.status(204).send(`Film ${filmId} updated.`);
  } catch (error) {
    console.log("Houston, we have a problem: ", error);
  } finally {
    client.close();
    console.log("The way is shut.");
  }
};

const deleteFilm = async (req, res) => {
  try {
    const filmId = new ObjectId(req.params.id);
    const collection = mongoose.connection.db.collection("films");
    await collection.deleteOne({ _id: filmId });
    res.status(200).send(`Film ${filmId} has been removed.`);
  } catch (error) {
    console.log("Houston, we have a problem: ", error);
  } finally {
    client.close();
    console.log("The way is shut.");
  }
};

module.exports = {
  // getCollection,
  // getQuery,
  listFilms,
  oneFilm,
  newFilm,
  updateFilm,
  deleteFilm,
};
