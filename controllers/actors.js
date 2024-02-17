const mongoose = require("mongoose");
const { connectDB } = require("../connectDB/connection");
const Actor = require("../mongoose/actor");

const listActors = async (req, res, next) => {
  try {
    const actors = await Actor.find();
    res.send(actors);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const oneActor = async (req, res, next) => {
  const actorId = req.params.id;
  try {
    const result = await Actor.findById(actorId);
    res.send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const newActor = async (req, res, next) => {
  const newActor = {
    actorId: req.body.actorId,
    name: req.body.name,
  };
  try {
    const createdActor = await Actor.create(newActor);
    res.status(201).send(`Inserted actor with _id: ${createdActor._id}`);
  } catch (error) {
    console.error("Houston we have a problem: ", error);
  }
};

const updateActor = async (req, res) => {
  const actorId = req.params.id;
  const updatedActor = {
    $set: {
      actorId: req.body.actorId,
      name: req.body.name,
    },
  };
  try {
    const update = await Actor.findOneAndUpdate({ _id: actorId }, updatedActor);
    res.status(204);
    res.send(`Actor ${actorId} updated.`);
  } catch (error) {
    console.log("Houston, we have a problem: ", error);
  }
};

const deleteActor = async (req, res) => {
  const actorId = req.params.id;
  try {
    const remove = await Actor.deleteOne({ _id: actorId });
    res.status(200).send(`Actor ${actorId} has been removed.`);
  } catch (error) {
    console.log("Houston, we have a problem: ", error);
  }
};

module.exports = {
  listActors,
  oneActor,
  newActor,
  updateActor,
  deleteActor,
};
