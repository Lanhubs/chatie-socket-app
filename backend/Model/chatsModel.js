// chatsName
// isGroupChat
// users
// latestMessage
// groupAdmin

const { mongoose } = require("./db/dbConnection");

const chatsSchema = new mongoose.Schema(
  {
    chatsName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.String, ref: "Users" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.String,
      ref: "Users",
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Chats", chatsSchema);
