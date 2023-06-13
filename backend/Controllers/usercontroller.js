const usersModel = require("../Model/usersModel");

exports.allChats = async (req, res) => {};
exports.getAllUsersController = async (req, res) => {
  try {
    const searchKeyword = req.query.search
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
      .find({ _id: {$ne: req.user._id}  })
      .select("-password");

    if (docs) {
      res.json({ users: docs, status: 2000 });
    }
  } catch (e) {
    res.json({ message: "users not found", status: 4000 });
  }
};
exports.getUserDetails = (req, res) => {
  const user = req.user;
  try {
    res.json({
      details: user,
      status: 2000,
    });
  } catch (error) {
    res.json({ error, status: 4000 });
  }
};
