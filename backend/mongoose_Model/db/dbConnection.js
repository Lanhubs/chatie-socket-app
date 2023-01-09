const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ChatieDB")
  .then((success) => {
    if (success) {
      console.log("database not connected");
    }
  })
  .catch((e) => console.log(e));
  const Schema = mongoose.Schema
module.exports = {Schema, mongoose}