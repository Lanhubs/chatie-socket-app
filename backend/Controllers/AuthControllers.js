const usersModel = require("../Model/usersModel");
const {
  decryptPassword,
  encryptPwd,
} = require("../Middlewares/handlePassword");
const { handleErrorMsg } = require("../Middlewares/errorHandler");
const { object_null_type_converter, hashPwd } = require("./impMethods");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
exports.signupController = async (req, res) => {
  var { password, profilePic, ...rest } = req.body;
  var hashedPwd = encryptPwd(password);
  let resData;
  //  const profilePic = req.file.path.replaceALl("\\", "/")

  try {
    const docs = await usersModel.create({
      _id: uuidv4(),
      password: hashedPwd,
      firstName: rest.firstName,
      lastName: rest.lastName,
      nickname: rest.nickname,
      email: rest.email,
      profilePic: profilePic,
    });

    if (docs) {
      if (docs["_doc"]) {
        resData = docs._doc;
      } else {
        var { password, ...rest } = docs;
        resData = rest;
       
        const token = jwt.sign({ user: rest._id }, "chatie", {
          expiresIn: 1000 * 60 * 60 * 24,
        });
      }
      const token = jwt.sign({ user: rest._id }, "chatie", {
        expiresIn: 1000 * 60 * 60 * 24,
      });
       res.send({
        status: 2000,
        details: resData,
        token,
      });
    }
  } catch (e) {
    console.log(e);
    res.send({ status: 4000, error: handleErrorMsg(e) });
  }
};

exports.loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const docs = await usersModel.findOne({ where: { email } }).lean();
    const userPwd = decryptPassword(password, docs.password);

    if (userPwd) {
      const { password, ...rest } = docs;
      const token = jwt.sign({ user: docs._id }, "chatie", {
        expiresIn: 1000 * 60 * 60 * 24,
      });

      res.status(200).send({
        status: 2000,
        details: rest,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: 4000,
      error /* "password or email is incorrect"  */,
    });
  }
};
generateToken = (id) => {
  console.log(id);
  return jwt.sign({ user: id }, "chatie", {
    expiresIn: 1000 * 60 * 60 * 24,
  });
};
exports.multiPost = (req, res) => {}