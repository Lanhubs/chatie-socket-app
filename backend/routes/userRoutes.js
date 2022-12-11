const { signupController, loginController, upload } = require("../Controllers/AuthControllers")

const express = require("express")
const allChats = require("../Controllers/usercontroller")
const route = express.Router()

route.post("/signup", upload, signupController )
route.post("/login", loginController)
route.all("/chats").get(allChats)
module.exports = route