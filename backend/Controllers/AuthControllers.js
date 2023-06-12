const usersModel = require("../Model/usersModel");
const {
  decryptPassword,
  encryptPwd,
} = require("../Middlewares/handlePassword");
const generateToken = require("./token");
const { handleErrorMsg } = require("../Middlewares/errorHandler");
const { object_null_type_converter, hashPwd } = require("./impMethods");
const { v4: uuidv4 } = require("uuid");
const signupController = async (req, res) => {
  var { password, profilePic, ...rest } = req.body;

  var hashedPwd = encryptPwd(password);
  //  const profilePic = req.file.path.replaceALl("\\", "/")

  try {
    const docs = await usersModel
      .create({
        _id: uuidv4(),
        password: hashedPwd,
        firstName: rest.firstName,
        lastName: rest.lastName,
        username: rest.username,
        email: rest.email,
        profilePic: profilePic,
      })
    if (docs) {
      var { password, ...rest } = docs;
      res.send({
        status: 2000,
        details: rest,
        token: generateToken(rest._id),
      });
    }
  } catch (e) {
    console.log(e);
    res.send({ status: 4000, error: handleErrorMsg(e) });
  }
  // var profilePic = req.file.path.replaceAll("\\", "/");
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const docs = await usersModel.findOne({ where: { email } }).lean();
    const userPwd = decryptPassword(password, docs.password);
    console.log(userPwd);
    if (userPwd) {
      const { password, ...rest } = docs;

      res.status(200).send({
        status: 2000,
        details: rest,
        token: generateToken(rest.__id),
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: 4000,
      error: e /* "password or email is incorrect"  */,
    });
  }
};

module.exports = { signupController, loginController };
