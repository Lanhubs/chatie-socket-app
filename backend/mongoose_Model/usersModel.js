const { mongoose, Schema } = require("./db/dbConnection");
const bcrypt = require("bcrypt");
const usersSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});
usersSchema.methods.matchPassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};
usersSchema.pre("save", async (next) => {
  const salt = await bcrypt.genSalt(20);
  const encryptPwd = await bcrypt.hash(this.password, salt);
  if (encryptPwd) {
    next();
  }
});
usersSchema.pre("save", async (next) => {
  if (!this.isModified) {
    next();
  }
});
module.exports = mongoose.model("Users", usersSchema);
