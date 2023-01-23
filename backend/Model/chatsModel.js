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
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Chats", chatsSchema);
