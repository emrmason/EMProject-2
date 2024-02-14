const routes = require("express").Router();
const moviesController = require("../controllers/movies");

routes.get("/", moviesController.listFilms);
routes.get("/oneFilm/:id", moviesController.oneFilm);
routes.post("/newFilm", moviesController.newFilm);
routes.put("/updateFilm/:id", moviesController.updateFilm);
routes.delete("/removeFilm/:id", moviesController.deleteFilm);

module.exports = routes;
