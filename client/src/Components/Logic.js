export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - i &&
    (messages[i + i].sender._id !== m.sender._id ||
      messages[i + i].sender._id !== undefined) &&
    messages[i].sender._id !== userId
  );
};
export const getSenderFull = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id ? users[1] : users;
};

export const getSender = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id
    ? users[1].nickname
    : users[0].nickname;
};
export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};
