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
  actorValidationRules(),
  validate,
  requiresAuth(),
  actorsController.newActor
);
routes.put(
  "/actors/:id",
  updateActorValidationRules(),
  actorValidationRules(),
  validate,
  requiresAuth(),
  actorsController.updateActor
);
routes.delete("/actors/:id", requiresAuth(), actorsController.deleteActor);

module.exports = routes;
