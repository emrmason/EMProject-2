const routes = require("express").Router();
const actorsController = require("../controllers/actors");
const {
  actorValidationRules,
  updateActorValidationRules,
  validate,
} = require("../validator");
const { requiresAuth } = require("express-openid-connect");

routes.get("/actors", actorsController.listActors);
routes.get("/actors/:id", actorsController.oneActor);
routes.post(
  "/actors",
  requiresAuth(),
  actorValidationRules(),
  validate,
  actorsController.newActor
);
routes.put(
  "/actors/:id",
  requiresAuth(),
  updateActorValidationRules(),
  actorValidationRules(),
  validate,
  actorsController.updateActor
);
routes.delete("/actors/:id", requiresAuth(), actorsController.deleteActor);

module.exports = routes;
