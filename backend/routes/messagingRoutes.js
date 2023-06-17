const express = require("express");
const { getAllMessages, sendMessage } = require("../Controllers/messagingController");
const { authorize } = require("../Middlewares/authMiddleware");
const route = express.Router();

route.route("/").post(authorize, sendMessage);
route.route("/:chatId").get(authorize, getAllMessages);

module.exports = route;
