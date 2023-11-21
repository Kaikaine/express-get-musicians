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


app.delete('/musicians/:id', async(req,res)=>{
    // const musicians = await Musician.findAll()
    // try{
    //     let musician = await Musician.findOne({where:{id: req.params.id}})
    //     console.log(musician)
    //     await musician.destroy()
    //     res.status(200)
    // } catch(error){
    //     console.log(error)
    // }

    try{
        await Musician.destroy({where:{id: req.params.id}})
        res.status(200)
    } catch(err){
        console.log(err)
    }
})
module.exports = app;
