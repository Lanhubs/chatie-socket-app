const usersModel = require("../Model/usersModel");

const allChats = async (req, res) => {};
const getAllUsersController = async (req, res) => {
  const searchKeyword = req.user.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          {
            name: { $regex: req.query.search, $options: "i" },
          },
        ],
      }
    : {};
  const docs = await usersModel
    .find(searchKeyword)
    .find({ $ne: req.user._id })
    .select("-password");

  if (docs) {
    res.json({ users: docs });
  }
  res.status(403).json({ message: "users not found" });
};
module.exports = { allChats, getAllUsersController };
