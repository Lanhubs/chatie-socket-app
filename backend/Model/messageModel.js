const chatsModel = require("./chatsModel");
const { sequelize, Sequelize } = require("./dbConnection");
const usersModel = require("./usersModel");
const db = sequelize;

const messagesModel = db.define(
  "Message",
  {
    content: {
      type: Sequelize.TEXT,
      time: true,
    }
  },
  { timestamps: true }
);
messagesModel.belongsTo(usersModel, {
  foreignKey: "id",
  as: "sender",
})
messagesModel.belongsToMany(chatsModel, {
  foreignKey: "id",
  
  through: "latestMessage"
});
module.exports = messagesModel;
