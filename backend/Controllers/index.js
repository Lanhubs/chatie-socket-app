const { getAllUsersController, allChats } = require("./usercontroller");
const {
  loginController,
  signupController,
  upload,
} = require("./AuthControllers");
module.exports = {
  signupController,
  loginController,
  getAllUsersController,
  allChats,
};
