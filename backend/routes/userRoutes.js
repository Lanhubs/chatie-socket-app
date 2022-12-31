const { signupController, loginController, upload } = require("../Controllers/AuthControllers")

const express = require("express")
const { authorize } = require("../middlewares/authMiddleware")
const { getAllUsersController } = require("../Controllers")
const route = express.Router()

route.post("/signup", upload, signupController )
route.post("/login", loginController)
route.route("/chats").get(allChats)
route.route("/user").get(authorize, getAllUsersController)

module.exports = route