const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const dotenv = require("dotenv").config();

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/", require("./routes/films"));
app.use("/", require("./routes/actors"));

//Error handling
process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.id,
    `Caught exception: ${err}/n` + `Exception origin: ${origin}`
  );
});

//Server
app.listen(PORT, () => {
  console.log("Nothing to see here, move along...");
});
