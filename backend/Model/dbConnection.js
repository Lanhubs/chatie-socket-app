const Sequelize = require("sequelize");

const sequelize = new Sequelize("chatieDB", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.log(err);
  });
sequelize.sync({force: true})
module.exports =  { sequelize, Sequelize };