const mongodb = require("../connectDB/connection");
const { get } = require("../routes/movies");
const ObjectId = require("mongodb").ObjectId;

const actorSchema = {
  actorID: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
};

const filmSchema = {
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
    retuired: true,
  },
  actors: [{ actorSchema }],
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
};

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

const newFilm = async (req, res) => {
  const client = await mongodb.connectDB();
  const newFilm = {
    title: req.body.title,
    releaseYear: req.body.releaseYear,
    rating: req.body.rating,
    actors: req.body.actors,
    category: req.body.category,
    director: req.body.director,
    length: req.body.length,
  };
  try {
    const collection = await getCollection("movies", "films");
    const result = await collection.insertOne(newFilm);
    res.send(`Insterted movie with _id: ${result.insertedId}`);
  } catch (error) {
    console.error("Houston we have a problem: ", error);
  } finally {
    await client.close();
    console.log("The way is shut.");
  }
};

const newActor = async (req, res) => {
  const client = await mongodb.connectDB();
  const newActor = {
    actorId: req.body.actorId,
    name: req.body.name,
  };
  try {
    const collection = await getCollection("movies", "actors");
    const result = await collection.insertOne(newActor);
    res.send(`insterted contact with _id: ${result.insertedId}`);
  } catch (error) {
    console.error("Houston we have a problem: ", error);
  } finally {
    await client.close();
    console.log("The way is shut.");
  }
};

const updateFilm = async (req, res) => {
  const client = await mongodb.connectDB();
  try {
    const filmId = new ObjectId(req.params.id);
    const collection = client.db("movies").collection("films");
    const filter = { _id: filmId };
    const update = {
      $set: {
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        rating: req.body.rating,
        actors: req.body.actors,
        category: req.body.category,
        director: req.body.director,
        length: req.body.length,
      },
    };
    const result = await collection.findOneAndUpdate(filter, update);
    res.send(`Film ${filmId} updated.`);
  } catch (error) {
    console.log("Houston, we have a problem: ", error);
  } finally {
    client.close();
    console.log("The way is shut.");
  }
};

const updateActor = async (req, res) => {
  const client = await mongodb.connectDB();
  try {
    const actorId = new ObjectId(req.params.id);
    const collection = client.db("movies").collection("actors");
    const filter = { _id: actorId };
    const update = {
      $set: {
        actorId: req.body.actorId,
        name: req.body.name,
      },
    };
    const result = await collection.findOneAndUpdate(filter, update);
    res.send(`Film ${actorId} updated.`);
  } catch (error) {
    console.log("Houston, we have a problem: ", error);
  } finally {
    client.close();
    console.log("The way is shut.");
  }
};

module.exports = {
  listFilms,
  oneFilm,
  listActors,
  oneActor,
  newFilm,
  newActor,
  updateFilm,
  updateActor,
  // removeFilm,
  // removeActor,
};
