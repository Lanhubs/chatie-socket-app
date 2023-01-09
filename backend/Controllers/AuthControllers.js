const usersModel = require("../Model/usersModel");
const bcrypt = require("bcrypt");
const generateToken = require("./token");

const signupController = (req, res,) => {
  var { userName, email, firstName, lastName, password } = req.body;

  var profilePic = req.file.path.replaceAll("\\", "/");
  usersModel.create({
      userName,
      password,
      email,
      firstName,
      lastName,
      profilePic,
    })
    .then((docs) => {
      if (docs) {
        var { userName, email, firstName, lastName, profilePic, id } = docs;
        res.send({
          status: 2000,
          details: {
            firstName,
            lastName,
            email,
            userName,
            profilePic,
            id,
            token: generateToken(id),
          },
        });
      }
    })
    .catch((e) => {
      const error = e.errors[0].message;
      res.send({ status: 4000, error });
      console.log(e);
    });
};

const loginController = (req, res, next) => {
  const { email, password } = req.body;
  usersModel
    .findOne({ where: { email } })
    .then(async (docs) => {
      const userPwd = await bcrypt.compare(password, docs.password);
      if (userPwd) {
        const { email, profilePic, userName, lastName, firstName, id } = docs;

        res.send({
          status: 2000,
          email,
          profilePic,
          userName,
          lastName,
          firstName,
          id,
          token: generateToken(id),
        });
      }
      if (!userPwd) {
        res.send({ status: 4000, error: "password or email is incorrect" });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};


module.exports = { signupController, loginController };
