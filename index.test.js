// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const seedMusician = require("./seedData");

describe("./musicians endpoint", () => {
  // Write your tests here

  test("musicians endpoint", async () => {
    const res = await request(app).get("/musicians");
    expect(res.statusCode).toBe(200);

    const resD = res.text;
    // console.log(typeof JSON.parse(resD));

    let allMusicians = await Musician.findAll();
    // console.log("MUSIC", typeof allMusicians);

    allMusicians = JSON.stringify(allMusicians);
    // console.log("RESD", typeof resD);

    expect(resD).toMatch(allMusicians);
  });

  test("musicians by ID endpoint", async () => {
    const res = await request(app).get("/musicians/1");
    expect(res.statusCode).toBe(200);

    const resD = res.text;
    console.log("RESD", resD);

    let musician = await Musician.findByPk(1);
    console.log("MUSIC", typeof musician);

    musician = JSON.stringify(musician);
    console.log("RESD", typeof resD);

    expect(resD).toMatch(musician);
  });
});
