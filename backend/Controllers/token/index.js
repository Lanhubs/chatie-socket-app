const jwt = require("jsonwebtoken");

exports.generateToken = (id) => {
  console.log(id)
  return jwt.sign({ user: id }, "chatie", {
    expiresIn: 1000 * 60 * 60 * 24,
  });
};
