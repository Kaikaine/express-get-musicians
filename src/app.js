const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians
app.get("/musicians", async (req, res) => {
  const data = await Musician.findAll();
  console.log(data);
  res.json(data);
});

app.get("/musicians/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Musician.findByPk(id);
  res.json(data);
});

module.exports = app;
