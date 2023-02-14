const express = require("express");
const bikeController = require("../controllers/bikeController");
const bikeRouter = express.Router();

// route getAll
bikeRouter.get("/", async (req, res) => {
  const bikes = await bikeController.getAll();
  res.send(bikes);
});

// route getOne
bikeRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const bike = await bikeController.getById(id);
  res.send(bike);
});

// route postOne
bikeRouter.post("/", async (req, res) => {
  const body = req.body;
  const bike = await bikeController.postOne(body);
  res.send(bike);
});

// route putOne
bikeRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const user = await bikeController.putOne(id, body);
  res.send(user);
});

// route deleteOne
bikeRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await bikeController.deleteOne(id);
  res.send(`Le vélo numéro ${id} a bien été supprimé`);
});

module.exports = bikeRouter;
