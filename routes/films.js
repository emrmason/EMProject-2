const routes = require("express").Router();
const filmsController = require("../controllers/films");

routes.get("/", filmsController.listFilms);
routes.get("/oneFilm/:id", filmsController.oneFilm);
routes.post("/newFilm", filmsController.newFilm);
routes.put("/updateFilm/:id", filmsController.updateFilm);
routes.delete("/removeFilm/:id", filmsController.deleteFilm);

module.exports = routes;
