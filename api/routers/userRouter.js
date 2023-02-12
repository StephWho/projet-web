const express = require("express");
const UserController = require("../controllers/userController");
const userRouter = express.Router();

// route getAll
userRouter.get("/", async (req, res) => {
    const users = await UserController.getAll();
    res.send(users);
  });

  module.exports = userRouter;
