const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Movies and Actors",
  },
  host: "emasonproject2.onrender.com",
  schemes: ["https"],
  // tags: [
  //   {
  //     name: "Movies",
  //     descriptions: "Detailed Movie info"
  //    }
  // {
  //   name: "Actors",
  //   description: "Actors Names"
  // }
  // ]
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/movies.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
