const mongoose = require("mongoose");
const { connectDB } = require("../connectDB/connection");
const Film = require("../mongoose/film");

const listFilms = async (req, res, next) => {
  try {
    const films = await Film.find();
    res.send(films);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const oneFilm = async (req, res, next) => {
  const filmId = req.params.id;
  try {
    const result = await Film.findById(filmId);
    res.send(result);
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
