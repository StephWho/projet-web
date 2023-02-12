const express = require('express');
const apiRouter = express.Router();
const userRouter = require('./userRouter');

apiRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

apiRouter.use('/users', userRouter);

module.exports = apiRouter;