import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState({});
  const [user, setUser] = useState({});
  const [search, setSearch] = useState();

  const [notification, setNotification] = useState();
  const [chats, setChats] = useState();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("chatie"));
    setUser(userInfo?.details);
    if (!userInfo) {
      setUser(null);
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        setSelectedChat,
        search,
        setSearch,
        selectedChat,
        chats,
        setChats,
        notification,
        setNotification,
        user,
        setUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
const ChatState = () => useContext(ChatContext);
export { ChatProvider, ChatState };
