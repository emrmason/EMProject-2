const express = require("express");
const app = express();
const port = process.env.port || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.get("/", (req, res) => {
  res.send("Running...");
});

app.listen(port, () => {
  console.log("Nothing to see here, move along...");
});
