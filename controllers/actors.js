const mongoose = require("mongoose");
const { connectDB } = require("../connectDB/connection");
const { ObjectId } = require("mongoose");
// const { getCollection, getQuery } = require("./films");

// connectDB();

const listActors = async (req, res, next) => {
  try {
    const collection = await mongoose.connection
      .db("movies")
      .collection("films");
    const result = await collection.find({}).toArray();
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send("Couldn't find anything...");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const oneActor = async (req, res, next) => {
  try {
    const actorId = new ObjectId(req.params.id);
    const collection = await mongoose.connection
      .db("movies")
      .collection("films");
    const result = await collection.find({ _id: actorId }).toArray();
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send("Couldn't find the actor you're looking for.");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const newActor = async (req, res) => {
  try {
    const collection = await mongoose.connection
      .db("movies")
      .collection("films");
    const newActor = {
      actorId: req.body.actorId,
      name: req.body.name,
    };
    const result = await collection.insertOne(newActor);
    res.status(201).send(`Inserted actor with _id: ${result.insertedId}`);
  } catch (error) {
    console.error("Houston we have a problem: ", error);
  } finally {
    await client.close();
    console.log("The way is shut.");
  }
};

const updateActor = async (req, res) => {
  try {
    const actorId = new ObjectId(req.params.id);
    const collection = await mongoose.connection
      .db("movies")
      .collection("films");
    const filter = { _id: actorId };
    const update = {
      $set: {
        actorId: req.body.actorId,
        name: req.body.name,
      },
    };
    await collection.findOneAndUpdate(filter, update);
    res.status(204).send(`Film ${actorId} updated.`);
  } catch (error) {
    console.log("Houston, we have a problem: ", error);
  } finally {
    client.close();
    console.log("The way is shut.");
  }
};

const deleteActor = async (req, res) => {
  try {
    const actorId = new ObjectId(req.params.id);
    const collection = await mongoose.connection
      .db("movies")
      .collection("films");
    await collection.deleteOne({ _id: actorId });
    res.status(200).send(`Actor ${actorId} has been removed.`);
  } catch (error) {
    console.log("Houston, we have a problem: ", error);
  } finally {
    client.close();
    console.log("The way is shut.");
  }
};

module.exports = {
  listActors,
  oneActor,
  newActor,
  updateActor,
  deleteActor,
};
