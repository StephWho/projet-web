const express = require("express");
const orderController = require("../controllers/orderController");
const orderRouter = express.Router();

// route getAll
orderRouter.get("/", async (req, res) => {
  const orders = await orderController.getAll();
  res.send(orders);
});

// route getOneById
orderRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const order = await orderController.getOneById(id);
  res.send(order);
});

// route getAllByIdUser
orderRouter.get("/userId/:id", async (req, res) => {
  const id = req.params.id;
  const order = await orderController.getAllByIdUser(id);
  res.send(order);
});

// route getAllPaid
orderRouter.get("/paid/:isPaid", async (req, res) => {
  const isPaid = req.params.isPaid;
  if (isPaid != "true" && isPaid != "false") {
    res.status(400).send('Erreur : veuilez écrire "true" ou "false".');
  } else {
    //évite d'exécuter le controller et qu'il y ait une erreur
    const orders = await orderController.getAllPaid(isPaid);
    res.send(orders);
  }
});

// route getAllAlreadyPlaced
orderRouter.get("/alreadyPlaced/:placed", async (req, res) => {
  const placed = req.params.placed;
  if (placed != "before" && placed != "after") {
    res.status(400).send('Erreur : veuilez écrire "before" ou "after".');
  } else {
    //évite d'exécuter le controller et qu'il y ait une erreur
    const orders = await orderController.getAllAlreadyPlaced(placed);
    res.send(orders);
  }
});

// route postOne
orderRouter.post("/", async (req, res) => {
  const body = req.body;
  const order = await orderController.postOne(body);
  res.send(order);
});

// route putOne
orderRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const order = await orderController.putOne(id, body);
  res.send(order);
});

// route deleteOne
orderRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await orderController.deleteOne(id);
  res.send(`La commande numéro ${id} a bien été supprimé`);
});

module.exports = orderRouter;
