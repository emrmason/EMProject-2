const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const dotenv = require("dotenv").config();
const validator = require("./validator");

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/", require("./routes/films"));
app.use("/", require("./routes/actors"));

//Error Handler
app.use((err, req, res, next) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  if (err instanceof NotFoundError) {
    res.status(404).json({ error: "Not Found" });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Server
app.listen(PORT, () => {
  console.log("Nothing to see here, move along...");
});
