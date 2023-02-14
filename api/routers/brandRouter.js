const express = require("express");
const brandController = require("../controllers/brandController");
const brandRouter = express.Router();

// route getAll
brandRouter.get("/", async (req, res) => {
    const brands = await brandController.getAll();
    res.send(brands);
  });

// route getOne
brandRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const brand = await brandController.getById(id);
  res.send(brand);
});

// route postOne
brandRouter.post("/", async (req, res) => {
  const body = req.body;
  console.log(body);
  const brand = await brandController.postOne(body);
  res.send(brand);
});

// route putOne
brandRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const brand = await brandController.putOne(id, body);
  res.send(brand);
});

// route deleteOne
brandRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await brandController.deleteOne(id);
  res.send(`La marque du vélo numéro ${id} a bien été supprimé`);
});

module.exports = brandRouter;