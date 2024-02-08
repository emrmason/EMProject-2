const routes = require("express").Router();
const moviesController = require("../controllers/movies");

routes.get("/movies", moviesController.listMovies);
routes.get("/oneMovie/:id", moviesController.oneMovie);

module.exports = routes;
