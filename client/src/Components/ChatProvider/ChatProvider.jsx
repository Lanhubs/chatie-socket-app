import cookie from "react-cookies";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext({
  selectedChat: null,
  user: null,
  search: "",
  chats: [],
  friends: [],
  hideCreateGroupBtn: false,
  changeComponent: null,
});

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState({});
  const [user, setUser] = useState();
  const [search, setSearch] = useState();

  const [notification, setNotification] = useState();
  const [chats, setChats] = useState();
  const [friends, setFriends] = useState();

  const [changeComponent, setChangeComponent] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    (() => {
      const token = cookie.load("Chatie");
      if (!token) {
        navigate("/authentication");
      }
      fetch("/api/user-details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === 4000) navigate("/authentication");
          setUser(data.details);
        });
    })();
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
        setFriends,
        friends,

        setChats,
        notification,
        setNotification,
        changeComponent,
        setChangeComponent,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};
