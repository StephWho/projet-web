const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

// route getAll
userRouter.get("/", async (req, res) => {
  const users = await userController.getAll();
  res.send(users);
});

// route getOne
userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userController.getById(id);
  res.send(user);
});

// route postOne (signup)
userRouter.post("/", async (req, res) => {
  const body = req.body;
  const user = await userController.postOne(body);
  res.send(user);
});

// route postUserByEmailandPassword (signin)
userRouter.post("/signin", async (req, res) => {
  const body = req.body;
  const user = await userController.postUserByEmailAndPassword(body);
  res.send(user);
});

// route putOne
userRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const user = await userController.putOne(id, body);
  res.send(user);
});

// route deleteOne
userRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await userController.deleteOne(id);
  res.send(`L'utilisateur numéro ${id} a bien été supprimé`);
});

module.exports = userRouter;
