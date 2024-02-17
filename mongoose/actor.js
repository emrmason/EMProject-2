const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema(
  {
    actorId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;
