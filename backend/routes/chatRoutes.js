const express = require("express");
const { authorize } = require("../middlewares/authMiddleware");
const {
  accessChats,
  createGroupChat,
  fetchChats,
  renameGroupChat,
  removeFromGroupChat,
  addToGroup,
} = require("../Controllers/chatController");
const route = express.Router();

// access chats
route.route("/acccessChats").post(authorize, accessChats);
// fetch chats
route.route("/getchats").get(authorize, fetchChats);
// create group
route.route("/creategroup").post(authorize, createGroupChat);

// rename group
route.route("/editgroup").put(authorize, renameGroupChat);
route.route("/addtogroup").put(authorize, addToGroup);

// remove from group
route.route("/acccessChats").delete(authorize, removeFromGroupChat);

module.exports = route;
