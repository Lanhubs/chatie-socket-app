
const { sequelize, Sequelize } = require("./dbConnection");
const db = sequelize;
const bcrypt = require("bcrypt");
const usersModel = db.define(
  "User",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userName: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isUnique: async (value) => {
          const user = await usersModel.findAll({ where: { userName: value } });
          if (user.length > 0) {
            throw new Error("username already in user");
          }
        },
      },
      required: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isUnique: async (value) => {
          const user = await usersModel.findAll({ where: { email: value } });

          if (user.length > 0) {
            throw new Error("email already in user");
          }
        },
      },

      allowNull: false,

      required: true,
    },
    profilePic: {
      type: Sequelize.STRING,
      unique: false,
      required: false,
    },
    firstName: {
      type: Sequelize.STRING,
     
      required: true,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      unique: true,
      required: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(11);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async () => {
        const salt = await bcrypt.genSalt(11);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  }
);

module.exports = usersModel;
