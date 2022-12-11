const fs = require("fs");
const path = require * "path";
const jwt = require("jsonwebtoken");

const generateToken = (id) => jwt.sign({ id }, "chatie", { expiresIn: "20d" });
module.exports = generateToken