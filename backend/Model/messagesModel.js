const { mongoose, Schema } = require("./db/dbConnection");
const messagesSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.String, ref: "Users" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.String, ref: "Chats" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Messages", messagesSchema);
