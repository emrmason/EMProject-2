const routes = require("express").Router();
const actorsController = require("../controllers/actors");
const { actorValidationRules, validate } = require("../validator");

routes.get("/", actorsController.listActors);
routes.get("/oneActor/:id", actorsController.oneActor);
routes.post(
  "/newActor",
  actorValidationRules(),
  validate,
  actorsController.newActor
);
routes.put("/updateActor/:id", actorsController.updateActor);
routes.delete("/deleteActor/:id", actorsController.deleteActor);

module.exports = routes;
