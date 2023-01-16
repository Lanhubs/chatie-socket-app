const chatsModel = require("../Model/chatsModel");
const messagesModel = require("../Model/messagesModel");
const usersModel = require("../Model/usersModel");

const accessChats = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("userId param not sent with the request");
    res.sendStatus(400);
  }
  var isChat = await chatsModel
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.ueser._id } } },
        {
          users: {
            $elemMatch: {
              $eq: userId,
            },
          },
        },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await usersModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "username email",
  });
  if (isChat.lenght > 0) {
    res.json(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await chatsModel.create(chatData);
      const fullChat = await chatsModel
        .findOne({ _id: createdChat._id })
        .populate("users", "-password");
      res.status(200).send(fullChat);
    } catch (e) {
      throw Error(e.message);
    }
  }
};

const fetchChats = async (req, res) => {
  try {
    chatsModel
      .find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await usersModel.populate(results, {
          path: "latestMessage.sender",
          select: "username  email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};
const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "please all the fields" });
  }
  var users = JSON.parse(req.body.user);
  if (users.length < 2) {
    res.status(400).send("More than 2 two users are required to make a group");
  }
  users.push(req.user);
  try {
    const groupChat = await chatsModel.create({
      chatName: req.body.name,
      isGroupChat: true,
      groupAdmin: req.user,
      users,
    });
    const fullGroupChat = await chatsModel
      .findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).send(fullGroupChat);
  } catch (error) {}
};
const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const addedUser = await chatsModel.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  );

  if (!added) {
    res.status(404);
    throw Error("chat not found");
  } else {
    res.status(200).json(added);
  }
};
const renameGroupChat = async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await chatsModel
    .findByIdAndUpdate(chatId, { chatName }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updatedChat) {
    res.status(404);
    throw Error("chat not found");
  } else {
    res.status(200).json(updatedChat);
  }
};
const removeFromGroupChat = async (req, res) => {
  const { chatId, userId } = req.body;
  const deletedChat = await chatsModel
    .findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!deletedChat) {
    res.status(404);
    throw Error("chat not found");
  } else {
    res.status(200).json(deletedChat);
  }
};

module.exports = {
  accessChats,
  createGroupChat,
  fetchChats,
  renameGroupChat,
  addToGroup,
  removeFromGroupChat,
};
