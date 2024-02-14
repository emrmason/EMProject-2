const mongoose = require("../connectDB/connection");

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  actors: [
    mongoose.Schema({
      actorID: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    }),
  ],
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

const Film = mongoose.model("Film", filmSchema);
