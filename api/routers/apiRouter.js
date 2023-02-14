const express = require("express");
const apiRouter = express.Router();
const userRouter = require("./userRouter");
const bikeRouter = require("./bikeRouter");
const typeRouter = require("./typeRouter");
const sizeRouter = require("./sizeRouter");
const brandRouter = require("./brandRouter");
const orderRouter = require("./orderRouter");

apiRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

apiRouter.use("/users", userRouter);
apiRouter.use("/bikes", bikeRouter);
apiRouter.use("/types", typeRouter);
apiRouter.use("/sizes", sizeRouter);
apiRouter.use("/brands", brandRouter);
apiRouter.use("/orders", orderRouter);

module.exports = apiRouter;
