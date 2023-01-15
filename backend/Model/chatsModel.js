const { sequelize, Sequelize } = require("./dbConnection");
const { usersModel } = require("./usersModel");
const db = require("./dbConnection");
const messagesModel = require("./messageModel");

const chatsSchema = {
  chatName: { type: Sequelize.STRING, trim: true },
  isGroupChat: { type: Sequelize.BOOLEAN, default: false },
};
const chatsModel = db.define("Chat", chatsSchema, { timestamps: true });
chatsModel.belongsTo(messagesModel, {
  foreignKey: "id",
  as: "latestMessage",
});
chatsModel.belongsToMany(usersModel, {
  foreignKey: "id",
  as: "users",
  through: "users"
  // type: Sequelize.ARRAY,
});
chatsModel.belongsTo(messagesModel, {
  foreignKey: "id",
  as: "latestMessage",
});
chatsModel.belongsTo(usersModel, {
  foreignKey: "id",
  as: "groupAdmin",
});

module.exports = chatsModel;
