const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const chatRoutes= require("./routes/chatRoutes")
const cors = require("cors");
const path = require("path");
app.use("/public", express.static(__dirname + "/public"));
const usersModel = require("./Model/usersModel");
app.use(express.urlencoded({extended: true}))
app.use(express.json({
  limit: "10mb"
}));
app.use(cors());

app.use("/api", userRoutes);
app.use("/api/chat", chatRoutes)
app.listen(4000, () => {
  console.log("server running at port:" + 4000);
});
