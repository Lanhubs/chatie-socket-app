const { mongoose } = require("./db/dbConnection");
const bcrypt = require("bcryptjs");
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "username already in use"],
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
  /* profilePic: {
    type: String,
  }, */
  password: {
    type: String,
    required: true,
  },
});

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
        const auth = await bcrypt.compare(password, usersSchema.password);
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
    bcrypt.genSalt(20, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  }
   next();
});
usersSchema.pre("save", async (next) => {
  if (!this.isModified) {
    next();
  }
});
module.exports = mongoose.model("Users", usersSchema);
