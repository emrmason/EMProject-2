const express = require("express");
const app = express();
const port = process.env.port || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

app.use(bodyParser.json());
app.use("/", require("./routes/movies"));
app.use(cors());

app.listen(port, () => {
  console.log("Nothing to see here, move along...");
});
