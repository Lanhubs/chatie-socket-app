const { signupController, loginController, upload } = require("../Controllers")
const express = require("express")
const { authorize } = require("../middlewares/authMiddleware")
const { getAllUsersController, allChats } = require("../Controllers")
const route = express.Router()

route.post("/signup", upload, signupController )
route.post("/login", loginController)
route.route("/chats").get(allChats)
route.route("/user").get(authorize, getAllUsersController)


module.exports = route
