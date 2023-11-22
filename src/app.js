const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;
app.use(express.json());

//TODO: Create a GET /musicians route to return all musicians
app.get("/musicians", async (req, res) => {
  const data = await Musician.findAll();
  // console.log(data);
  res.json(data);
});

app.get("/musicians/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Musician.findByPk(id);
  res.json(data);
});

app.post('/musicians', async (req, res) => {
  const newMusician = await Musician.create(req.body);
  res.status(200).json(newMusician);
})


app.delete('/musicians/:id', async (req, res) => {
    await Musician.destroy({ where: { id: req.params.id } })
    res.send(`${req.params.id} musician deleted`)
})

app.put('/musicians/:id', async (req, res) => {
    const entryBiengChanged = await Musician.findByPk(req.params.id)
    await entryBiengChanged.set(req.body)
    res.send(`Changed ${entryBiengChanged} to ${req.body}`)
})
module.exports = app;
