const { check } = require("express-validator");

const filmValidationRules = () => {
  return [body("releaseYear").isLength({ min: 4 })];
};

const actorValidationRules = () => {
  return [body("actorId").isLength({ min: 4 })];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmtpy()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  filmValidationRules,
  actorValidationRules,
  validate,
};
