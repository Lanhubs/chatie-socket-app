const jwt = require("jsonwebtoken");
const usersModel = require("../Model/usersModel");
exports.authorize = async (req, res, next) => {
  var token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, "chatie");
    req.user = await usersModel
      .findById({ _id: decodedToken.user })
      .select("-password");
    next();
  }
  if (!token) {
    res.status(401).send("invalid or unauthorized token");
  }
};
