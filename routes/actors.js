const routes = require("express").Router();
const moviesController = require("../controllers/movies");

routes.get("/actors", moviesController.listActors);
routes.get("/oneActor/:id", moviesController.oneActor);
routes.post("/newActor", moviesController.newActor);
routes.put("/updateActor/:id", moviesController.updateActor);
routes.delete("/removeActor/:id", moviesController.deleteActor);

module.exports = routes;
