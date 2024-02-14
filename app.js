const express = require("express");
const app = express();
const port = process.env.port || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
// const { validation } = require()
// Environment variables
require("dotenv").config();

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/", require("./routes/films"));
app.use("/", require("./routes/actors"));

app.listen(port, () => {
  console.log("Nothing to see here, move along...");
});
