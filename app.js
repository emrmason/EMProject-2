const express = require("express");
const app = express();
const port = process.env.port || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
require("dotenv").config();

app.use(bodyParser.json());
app.use("/", require("./routes/movies"));
app.use(cors());

app.listen(port, () => {
  console.log("Nothing to see here, move along...");
});
