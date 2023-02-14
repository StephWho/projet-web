const express = require("express");
const typeController = require("../controllers/typeController");
const typeRouter = express.Router();

// route getAll
typeRouter.get("/", async (req, res) => {
  const types = await typeController.getAll();
  res.send(types);
});

// route getOne
typeRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const type = await typeController.getById(id);
  res.send(type);
});

// route postOne
typeRouter.post("/", async (req, res) => {
  const body = req.body;
  const type = await typeController.postOne(body);
  res.send(type);
});

// route putOne
typeRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const type = await typeController.putOne(id, body);
  res.send(type);
});

// route deleteOne
typeRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await typeController.deleteOne(id);
  res.send(`Le type du vélo numéro ${id} a bien été supprimé`);
});

module.exports = typeRouter;
