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

const Actor = mongoose.model("Actor", actorSchema);
