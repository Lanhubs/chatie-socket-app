// chatsName
// isGroupChat
// users
// latestMessage
// groupAdmin

const { Schema, mongoose } = require("./db/dbConnection");

const chatsSchema = new Schema(
  {
    chatsName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: "Users" }],
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
