const express = require("express");
const apiRouter = require("./routers/apiRouter");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
