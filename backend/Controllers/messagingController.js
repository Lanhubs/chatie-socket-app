const messagesModel = require("../Model/messagesModel");
const chatsModel = require("../Model/chatsModel");
const usersModel = require("../Model/usersModel");

exports.sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    res.json({ status: 4000, msg: "invalid data passed into request" });
  }
  try {
    const newMsg = {
      sender: req.user._id,
      content,
      chat: chatId,
    };

    var message = await messagesModel.create(newMsg);

    message = await message.populate("sender", "nickname profilePic");
    message = await message.populate("chat");
    message = await usersModel.populate(message, {
      path: "chat.users",
      select: "profilePic nickname email",
    });
    await chatsModel.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    res.json({ message, status: 2000 });
  } catch (error) {
    console.log(error)
    res.json({ status: 4000, message: error });
  }
};
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await messagesModel
      .find({ chat: req.params.chatId })
      .populate("sender", "nickname pic email")
      .populate("chat");
        console.log(messages)
      res.json({ messages, status: 2000 });
  } catch (error) {
    res.json({ msg: error, status: 4000 });
  }
};
