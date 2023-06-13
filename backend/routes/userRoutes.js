
const express = require("express");
const { getUserDetails, getAllUsersController, allChats } = require("../Controllers/usercontroller");
const { authorize } = require("../middlewares/authMiddleware");
const { multiPost, signupController, loginController } = require("../Controllers/AuthControllers");
const route = express.Router();

route.post("/signup", signupController);
route.post("/login", loginController);
route.route("/chats").get(allChats);
route.route("/users").get(authorize, getAllUsersController);

route.get("/user-details", authorize, getUserDetails);
route.post("/multi-signup", multiPost);


module.exports = route;
