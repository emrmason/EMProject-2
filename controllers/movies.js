const mongodb = require("../connectDB/connection");
const ObjectId = require("mongodb").ObjectId;

// Resource: ChatGPT helped me with details for breaking down my code into reusable parts. YAY!!!
const getCollection = async (base, collectionName) => {
  const client = await mongodb.connectDB();
  return client.db(base).collection(collectionName);
};

const getQuery = async (collection, query) => {
  return await collection.find(query).toArray();
};

const listFilms = async (req, res, next) => {
  try {
    // const client = await mongodb.connectDB();
    // const collection = client.db("movies").collection("films");
    const collection = await getCollection("movies", "films");
    // const result = await collection.find().toArray();
    const result = await getQuery(collection, {});
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

const oneFilm = async (req, res, next) => {
  try {
    const movieId = new ObjectId(req.params.id);
    // const client = await mongodb.connectDB();
    const collection = await getCollection("movies", "films");
    // const result = await collection.find({ _id: movieID }).toArray();
    const result = await getQuery(collection, { _id: movieId });
    if (result.length > 0) {
      res.send(result);
    } else {
      console.log("Couldn't find the movie you're looking for.");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const listActors = async (req, res, next) => {
  try {
    const collection = await getCollection("movies", "actors");
    const result = await getQuery(collection, {});
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
    const collection = await getCollection("movies", "actors");
    const result = await getQuery(collection, { _id: actorId });
    if (result.length > 0) {
      res.send(result);
    } else {
      console.log("Couldn't find the actor you're looking for.");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  listFilms,
  oneFilm,
  listActors,
  oneActor,
};
