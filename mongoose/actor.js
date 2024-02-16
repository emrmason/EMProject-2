const mongoose = require("../connectDB/connection");

const actorSchema = new mongoose.Schema({
  actorID: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const actor = mongoose.model("Actor", actorSchema);

module.exports = actor;
