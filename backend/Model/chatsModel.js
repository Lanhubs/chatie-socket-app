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
    users: [{ type: mongoose.Schema.Types.UUID, ref: "Users" }],
    latestMessage: {
      type: mongoose.Schema.Types.UUID,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.UUID,
      ref: "Users",
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Chats", chatsSchema);
