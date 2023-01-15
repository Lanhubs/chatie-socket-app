import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState();
  const [chats, setChats] = useState();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("chatie"));
    if (!userInfo) {
        navigate("/authenticate");
    }
    setUser(userInfo);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        setSelectedChat,
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
const chatState = useContext(ChatContext)
export {ChatProvider, chatState};
