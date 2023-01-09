const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const path = require("path");
app.use("/public", express.static(__dirname + "/public"));
const usersModel = require("./Model/usersModel");
app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.get("/", (req, res) => {
  usersModel
    .findAll()
    .then((docs) => {
      console.log(docs);
      res.json(docs);
    })
    .catch((e) => console.log(e));
});
app.listen(5000, () => {
  console.log("server running at port:" + 5000);
});
