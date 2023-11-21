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

    let musician = await Musician.findByPk(1);

    musician = JSON.stringify(musician);

    expect(resD).toMatch(musician);
  });

  test('a new musician can be created via POST', async () => {
    const musiciansBeforePost = await request(app).get('/musicians')
    const lengthBefore = musiciansBeforePost._body.length
    // console.log(lengthBefore)

    const newMusician = {
      name: 'Test',
      instrument: 'Test'
    }

    const res = await request(app)
      .post('/musicians')
      .send(newMusician)

    expect(res.statusCode).toBe(200);

    const musiciansAfterPost = await request(app).get('/musicians')
    expect(musiciansAfterPost._body).toHaveLength(lengthBefore + 1)
  })

  // test('testing DELETE endpoint', async()=>{
  //   const musiciansLenght = await request(app).get('/musicians')
  //   const musiciansLenghtAfterDelete = await request(app).delete('/musicians/1')
  //   // expect(musiciansLenghtAfterDelete._body.length).toBe(musiciansLenght._body.length - 1)
  // })

});

