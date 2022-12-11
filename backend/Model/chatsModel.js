const { sequelize, Sequelize } = require("./dbConnection");
const { usersModel } = require("./usersModel");
const db = require("./dbConnection");
const messagesModel = require("./messageModel");

const chatsSchema = {
  chatName: { type: Sequelize.STRING, trim: true },
  isGroupChat: { type: Sequelize.BOOLEAN, default: false },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
};
const chatsModel = db.define("Chat", chatsSchema, { timestamps: true });
chatsModel.hasMany(usersModel, {
  foreignKey: "id",
  as: "users",
  type: Sequelize.ARRAY,
});
chatsModel.hasMany(messagesModel, {
  foreignKey: "id",
  as: "latestMessage",
  type: Sequelize.TEXT,
});
chatsModel.hasMany(usersModel, {
  foreignKey: "id",
  as: "groupAdmin",
});

module.exports = chatsModel;
