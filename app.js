const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const dotenv = require("dotenv").config();
const validator = require("./validator/");

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/", require("./routes/films"));
app.use("/", require("./routes/actors"));
app.use("/", validator.handleErrors());

//Error Handler
app.use(async (err, req, res, next) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  res.render("errors/error", err.status || "Server Error", err.message);
});

//Server
app.listen(PORT, () => {
  console.log("Nothing to see here, move along...");
});
