const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Name that movie..."],
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
        actorId: {
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
      required: [true, "Is it comedy, drama, action?"],
    },
    director: {
      type: String,
      required: true,
    },
    length: {
      type: String,
      required: [true, "Hours first, then minutes ( _ hr _ min)"],
    },
  },
  { versionKey: false }
);

const Film = mongoose.model("Film", filmSchema);

module.exports = Film;
