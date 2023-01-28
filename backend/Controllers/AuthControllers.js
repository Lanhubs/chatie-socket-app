const usersModel = require("../Model/usersModel");
const bcrypt = require("bcryptjs");
const generateToken = require("./token");
const { object_null_type_converter, hashPwd } = require("./impMethods");

const signupController = async (req, res) => {
  var { username, email, firstName, lastName, password } =
    object_null_type_converter(req.body);
  var hashedPwd = await hashPwd(password);
  //  const profilePic = req.file.path.replaceALl("\\", "/")

  try {
    const docs = await usersModel.create({
      username,
      password: hashedPwd,
      email,
      firstName,
      lastName,
      // profilePic,
    });
    if (docs) {
      var { username, email, firstName, lastName, _id } = docs;
      res.send({
        status: 2000,
        details: {
          firstName,
          lastName,
          email,
          username,
          _id,
          token: generateToken(_id),
        },
      });
    }
  } catch (e) {
    console.log(e);
    // const error = e?.errors[0].message;
    // res.send({ status: 4000, error });
    console.log(e);
  }
  // var profilePic = req.file.path.replaceAll("\\", "/");
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const docs = await usersModel.findOne({ where: { email } }).lean();
    const userPwd = await bcrypt.compare(password, docs.password);
    if (userPwd) {
      const { password, ...rest } = docs;

      res.status(200).send({
        status: 2000,
        details: {
          ...rest,
        },
        token: generateToken(rest.__id),
      });
    }
    if (!userPwd) {
      res.send({ status: 4000, error: "password or email is incorrect" });
    }
  } catch (error) {

    console.log(error);
  }
};

module.exports = { signupController, loginController };
