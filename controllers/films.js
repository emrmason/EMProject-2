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
  const newFilm = {
    title: req.body.title,
    releaseYear: req.body.releaseYear,
    rating: req.body.rating,
    actors: req.body.actors,
    category: req.body.category,
    director: req.body.director,
    length: req.body.length,
  };
  try {
    const createdFilm = await Film.create(newFilm);
    res.status(201).send(`Insterted movie with _id: ${createdFilm._id}`);
  } catch (error) {
    console.error("Houston we have a problem: ", error);
  }
};

const updateFilm = async (req, res) => {
  const filmId = req.params.id;
  const updatedFilm = {
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
  try {
    const update = await Film.findOneAndUpdate({ _id: filmId }, updatedFilm);
    res.status(204).send(`Film ${filmId} updated.`);
  } catch (error) {
    console.log("Houston, we have a problem: ", error);
  }
};

const deleteFilm = async (req, res) => {
  const filmId = req.params.id;

  try {
    const remove = await Film.deleteOne({ _id: filmId });
    res.status(200).send(`Film ${filmId} has been removed.`);
  } catch (error) {
    console.log("Houston, we have a problem: ", error);
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
