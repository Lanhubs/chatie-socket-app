const chatsModel = require("../Model/chatsModel");
const { Sequelize } = require("../Model/dbConnection");
const usersModel = require("../Model/usersModel");

const accessChats = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("userId param not sent with the request");
    res.sendStatus(400);
  }
  var isChat = await chatsModel
    .findAll({
      where: {
        isGroupChat: false,
        [Sequelize.Op.and]: {
          users: {
            [Sequelize.Op.match]: [
              { [Sequelize.Op.eq]: req.user.id },
              { [Sequelize.Op.eq]: req.userdId },
            ],
          },
        },
        exclude: ["password", "dateOfBirth"], include: [{
            model: usersModel,
            attributes: ["users", "latestMessage"]
        }]

      },
    })
    .populate();
};
module.exports = { accessChats };
