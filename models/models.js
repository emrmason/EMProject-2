const mongodb = require("mongodb");

const filmSchema = new mongodb.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Int32,
    required: true,
  },
  rating: {
    type: String,
    retuired: true,
  },
  actors: [actorSchema],
  category: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  length: {
    type: String,
    required: true,
  },
});

const actorSchema = new mongodb.Schema({
  actorID: {
    type: Int32,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = { filmSchema, actorSchema };

// help on film schema where Actors were involved - Chat GPT and https://javascript.plainenglish.io/node-js-models-and-database-3836f0c7f2da
