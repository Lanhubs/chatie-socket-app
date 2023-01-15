const express = require("express")
const { authorize } = require("../middlewares/authMiddleware")
const route = express.Router()



// fetch chats
// route.route("/api/getchats").get(authorize, fetchChats)
// access chats
// route.route("/api/acccessChats").get(authorize, accessChats)
// create group
// route.route("/api/creategroup").post(authorize, createGroupChat)

// rename group
// route.route("/api/editgroup").put(authorize, renameGroupChat)

// remove from group
// route.route("/api/acccessChats").delete(authorize, removeFromGroupChat)





module.exports = route