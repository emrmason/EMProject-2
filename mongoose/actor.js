const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema(
  {
    actorId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Every actor has a name!"],
    },
  },
  { versionKey: false }
);

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;
