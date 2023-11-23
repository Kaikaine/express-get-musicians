const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;
app.use(express.json());

//TODO: Create a GET /musicians route to return all musicians
app.get("/musicians", async (req, res, next) => {
  try {
    const data = await Musician.findAll();
    res.json(data);
  } catch(error) {
    next(error)
  }
});

app.get("/musicians/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Musician.findByPk(id);
    res.json(data);
  } catch(error) {
    next(error)
  }
});

app.post('/musicians', async (req, res, next) => {
  try {
    const newMusician = await Musician.create(req.body);
    res.status(200).json(newMusician);
  } catch(error) {
    next(error)
  }
})


app.delete('/musicians/:id', async (req, res, next) => {
  try {
    await Musician.destroy({ where: { id: req.params.id } })
    res.send(`${req.params.id} musician deleted`)
  } catch(error) {
    next(error)
  }
})

app.put('/musicians/:id', async (req, res, next) => {
  try {
    const entryBiengChanged = await Musician.findByPk(req.params.id)
    await entryBiengChanged.set(req.body)
    res.send(`Changed ${entryBiengChanged} to ${req.body}`)
  } catch(error) {
    next(error)
  }
})
module.exports = app;
