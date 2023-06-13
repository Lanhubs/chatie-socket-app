const {
  comparePasswords,
  hashPassword,
} = require("../Middlewares/handlePassword");
const { mongoose } = require("./db/dbConnection");
const usersSchema = new mongoose.Schema({
  _id: String,
  nickname: {
    type: String,
    required: true,
    unique: [true, "nickname already in use"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email already in use"],
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
    require: [true, "you must provide a profile picture"]
  },
  password: {
    type: String,
    required: true,
  },
});

usersSchema.path("email").validate(async (value) => {
  const countUsername = await mongoose.models.Users.countDocuments({
    nickname: value,
  });
  return !countUsername;
}, "nickname already in use");
usersSchema.path("email").validate(async (value) => {
  const countEmail = await mongoose.models.Users.countDocuments({
    email: value,
  });
  return !countEmail;
}, "Email already in use");
usersSchema.statics.login = async (email, password) => {
  if (email) {
    if (password) {
      const user = await usersSchema.findOne({ email });
      if (user) {
        const auth = await comparePasswords(password, usersSchema.password);
        if (auth) return user;
        throw Error("incorrect details");
      }
      throw Error("incorrect email");
    }
    throw Error("password is reuqired");
  }
  throw Error("email is required");
};
// encrypt password before save technique
usersSchema.pre("save", (next) => {
  const user = this;
  if (user.isNew) {
    user.password = hashPassword(user.password);
    next();
  }
  next();
});
usersSchema.pre("save", async (next) => {
  if (!this.isModified) {
    next();
  }
});
module.exports = mongoose.model("Users", usersSchema);
