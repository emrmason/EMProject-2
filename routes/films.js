const routes = require("express").Router();
const filmsController = require("../controllers/films");
const { filmValidationRules, validate } = require("../validator");

routes.get("/films", filmsController.listFilms);
routes.get("/films/:id", filmsController.oneFilm);
routes.post("/films", filmValidationRules(), validate, filmsController.newFilm);
routes.put("/films/:id", filmsController.updateFilm);
routes.delete("/films/:id", filmsController.deleteFilm);

module.exports = routes;
