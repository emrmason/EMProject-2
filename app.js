const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const dotenv = require("dotenv").config();
const validator = require("./validator");
const { auth, requiresAuth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: "https://emasonproject2.onrender.com",
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

// Middleware
app.use(bodyParser.json());
app.use(cors());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// Swagger documentation
app.use(
  "/api-docs",
  config.authRequired ? requiresAuth() : (req, res, next) => next(),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

//Routes
app.use("/", require("./routes/films"));
app.use("/", require("./routes/actors"));

//Error Handler
// app.use((err, req, res, next) => {
//   console.error(`Error at: "${req.originalUrl}": ${err.message}`);
//   if (err instanceof NotFoundError) {
//     res.status(404).json({ error: "Not Found" });
//   } else {
//     res.json({ err, message });
//   }
// });

//Server
app.listen(PORT, () => {
  console.log("Nothing to see here, move along...");
});
