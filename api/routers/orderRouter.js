const express = require("express");
const orderController = require("../controllers/orderController");
const orderRouter = express.Router();

// route getAll
orderRouter.get("/", async (req, res) => {
    const orders = await orderController.getAll();
    res.send(orders);
  });

// route getOne
orderRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const order = await orderController.getById(id);
    res.send(order);
  });  

// route postOne
orderRouter.post("/", async (req, res) => {
  const body = req.body;
  console.log(body);
  const order = await orderController.postOne(body);
  res.send(order);
});

// route putOne
orderRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const user = await orderController.putOne(id, body);
  res.send(user);
});

// route deleteOne
orderRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await orderController.deleteOne(id);
  res.send(`La commande numéro ${id} a bien été supprimé`);
});

module.exports = orderRouter;