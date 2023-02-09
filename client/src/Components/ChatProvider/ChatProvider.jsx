import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState({});
  const [user, setUser] = useState();
  const [search, setSearch] = useState();

  const [notification, setNotification] = useState();
  const [chats, setChats] = useState();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("chatie"));
    if (!userInfo) {
      setUser(null);
    }
    setUser(userInfo.details);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        setSelectedChat,
        search,
        setSearch,
        selectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
const ChatState = () => {
  return useContext(ChatContext);
};
export { ChatProvider, ChatState };
