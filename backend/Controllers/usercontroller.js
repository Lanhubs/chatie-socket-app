const { Sequelize } = require("../Model/dbConnection");
const usersModel = require("../Model/usersModel");

const allChats = async (req, res) => {};
const getAllUsersController = async (req, res) => {
  var userQuery = req.query;
  //   get all users when there's search query proided
  const searchUserQuery = {
    where: {
      [Sequelize.Op.or]: [
        { [Sequelize.Op.iRegexp]: userQuery },
        { id: { [Sequelize.Op.ne]: req.user } },
      ],
    },
  };
  //   get all users if there's no any search query provided
  const getAllUsersQueryNoSearch = {
    where: {
      id: { [Sequelize.Op.ne]: req.user },
    },
  };

  var options = {};
  if (Object.keys(userQuery) === 0) {
    options = getAllUsersQueryNoSearch;
  } else if (Object.keys(userQuery).length !== 0) {
    options = searchUserQuery;
  }

  usersModel
    .findAll({
      attributes: { exclude: ["password", "dateOfBirth"], options },
    })
    .then((docs) => {
      if (docs) {
        res.json({ users: docs });
      }
      res.status(403).json({ message: "users not found" });
    })
    .catch((e) => {
      console.log(e);
    });
};
module.exports = { allChats, getAllUsersController};
