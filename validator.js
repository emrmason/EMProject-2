const { body, param } = require("express-validator");
const Actor = require("./mongoose/actor");
const Film = require("./mongoose/film");

// POST validation functions
const filmValidationRules = () => {
  return [
    body("releaseYear").isLength({ min: 4 }).isInt({ min: 1900, max: 3000 }),
    body("category").isString(),
  ];
};

const actorValidationRules = () => {
  return [body("actorId").isLength({ min: 4 })];
};

// Additional PUT validation functions
const updateActorValidationRules = () => {
  return [
    param("id")
      .custom((value) => Actor._id.isValid(value))
      .withMessage("Invalid id for update."),
  ];
};

const updateFilmValidationRules = () => {
  return [
    param("id")
      .custom((value) => Film._id.isValid(value))
      .withMessage("Invalid id for update."),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(400).json({
    errors: extractedErrors,
  });
};

// Error Handling
const handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = {
  filmValidationRules,
  actorValidationRules,
  updateFilmValidationRules,
  updateActorValidationRules,
  validate,
  handleErrors,
};
