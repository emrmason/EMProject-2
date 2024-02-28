const routes = require("express").Router();
const filmsController = require("../controllers/films");
const {
  filmValidationRules,
  updateFilmValidationRules,
  validate,
} = require("../validator");
const { requiresAuth } = require("express-openid-connect");

routes.get("/films", filmsController.listFilms);
routes.get("/films/:id", filmsController.oneFilm);
routes.post(
  "/films",
  requiresAuth(),
  filmValidationRules(),
  validate,
  filmsController.newFilm
);
routes.put(
  "/films/:id",
  requiresAuth(),
  updateFilmValidationRules(),
  filmValidationRules(),
  validate,
  filmsController.updateFilm
);
routes.delete("/films/:id", requiresAuth(), filmsController.deleteFilm);

module.exports = routes;
