const routes = require("express").Router();
const actorsController = require("../controllers/actors");
// const { actorValidationRules, validate } = require("../validator");

routes.get("/actors", actorsController.listActors);
routes.get("/actors/:id", actorsController.oneActor);
routes.post("/actors", actorsController.newActor);
routes.put("/actors/:id", actorsController.updateActor);
routes.delete("/actors/:id", actorsController.deleteActor);

module.exports = routes;

// inside route.post
// actorValidationRules(),
// validate,
