const routes = require("express").Router();
const moviesController = require("../controllers/movies");

routes.get("/", moviesController.listFilms);
routes.get("/oneFilm/:id", moviesController.oneFilm);
routes.get("/actors", moviesController.listActors);
routes.get("/oneActor/:id", moviesController.oneActor);
routes.post("/newFilm", moviesController.newFilm);
routes.post("/newActor", moviesController.newActor);
routes.put("/updateFilm/:id", moviesController.updateFilm);
routes.put("/updateActor/:id", moviesController.updateActor);
routes.delete("/removeFilm/:id", moviesController.deleteFilm);
routes.delete("/removeActor/:id", moviesController.deleteActor);

module.exports = routes;
