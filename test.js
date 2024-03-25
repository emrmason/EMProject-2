const express = require("express");
const app = new express();
const filmRoutes = require("./routes/films");
const filmModel = require("./mongoose/film");
const {
  listFilms,
  oneFilm,
  newFilm,
  updateFilm,
  deleteFilm,
} = require("./controllers/films");
const mockingoose = require("mockingoose");
const mongoose = require("mongoose");
const request = require("supertest");

app.use("/", filmRoutes);

describe("Film routes okay", () => {
  test("film get list route, expect 200 status", async () => {
    const res = await request(app).get("/films");
    expect(res.statusCode).toBe(200);
  });
  test("film single get route, expect 200 status", async () => {
    const res = await request(app).get("/films/65c53d0a063b09374c3d1f13"); // this will pass testing, even if the id isn't correct... what does that mean?
    expect(res.statusCode).toBe(200);
  });
});

afterAll(async () => {
  await mongoose.connection.close().catch((error) => console.error(error));
});

// describe("Get Actors", () => {
//   describe("Get list of actors", () => {
//     const req = {};
//     const res = {
//       send: jest.fn(),
//     };
//     it("Should return the list of actors", async () => {
//       mockingoose(actorsModel).toReturn(
//         [
//           {
//             actorId: "1001",
//             name: "Sam Neill",
//           },
//         ],
//         "find"
//       );
//       await listActors();
//       expect(res.send).toHaveBeenCalledWith([
//         { actorId: 1001, actorName: "Sam Neill" },
//       ]);
//     });
//   });
// });
