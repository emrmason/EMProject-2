const routes = require("express").Router();
const moviesController = require("../controllers/movies");

routes.get("/films", moviesController.listFilms);
routes.get("/oneFilm/:id", moviesController.oneFilm);
routes.get("/actors", moviesController.listActors);
routes.get("/oneActor/:id", moviesController.oneActor);

module.exports = routes;
