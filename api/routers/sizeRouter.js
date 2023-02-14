const express = require("express");
const sizeController = require("../controllers/sizeController");
const sizeRouter = express.Router();

// route getAll
sizeRouter.get("/", async (req, res) => {
    const sizes = await sizeController.getAll();
    res.send(sizes);
  });

// route getOne
sizeRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const size = await sizeController.getById(id);
  res.send(size);
});

// route postOne
sizeRouter.post("/", async (req, res) => {
  const body = req.body;
  console.log(body);
  const size = await sizeController.postOne(body);
  res.send(size);
});

// route putOne
sizeRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const size = await sizeController.putOne(id, body);
  res.send(size);
});

// route deleteOne
sizeRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await sizeController.deleteOne(id);
  res.send(`La taille du vélo numéro ${id} a bien été supprimé`);
});

module.exports = sizeRouter;