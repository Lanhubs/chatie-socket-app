const express = require("express");
const {
  accessChats,
  createGroupChat,
  fetchChats,
  renameGroupChat,
  removeFromGroupChat,
  addToGroup,
} = require("../Controllers/chatController");
const { authorize } = require("../Middlewares/authMiddleware");
const route = express.Router();

// access chats
route.route("/acccessChats").post(authorize, accessChats).delete(authorize, removeFromGroupChat);
// fetch chats
route.route("/getchats").get(authorize, fetchChats);
// create group
route.route("/creategroup").post(authorize, createGroupChat);

// rename group
route.route("/editgroup").put(authorize, renameGroupChat);
route.route("/addtogroup").put(authorize, addToGroup);


module.exports = route;
