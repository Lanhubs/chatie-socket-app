const jwt = require("jsonwebtoken");
const usersModel = require("../Model/usersModel");
const authorize = async (req, res, next) => {
  var token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startswith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = await usersModel.findToken({ where: { id: decodedToken.id } });
    next();
  }
  res.status(405).send("invalid or unauthorized token");
};




module.exports = {authorize}