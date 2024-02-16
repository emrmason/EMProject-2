const routes = require("express").Router();
const actorsController = require("../controllers/actors");

routes.get("/", actorsController.listActors);
routes.get("/oneActor/:id", actorsController.oneActor);
routes.post("/newActor", actorsController.newActor);
routes.put("/updateActor/:id", actorsController.updateActor);
routes.delete("/deleteActor/:id", actorsController.deleteActor);

module.exports = routes;
