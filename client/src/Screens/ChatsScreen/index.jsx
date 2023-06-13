import { Box } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../Components/atoms";
import Bars from "../../Components/Bars/";
import {
  ChatState,
  ChatProvider,
} from "../../Components/ChatProvider/ChatProvider";
import Chats from "../../Components/Conversation/index";
import FriendList from "../../Components/FriendsList";
import cookie from "react-cookies";

const ChatScreen = () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  useEffect(() => {
    const userDetails = cookie.load("Chatie");
    const data = userDetails
  
    if (!userDetails || !data) {
      navigate("/authentication");
    }
    setUser(data.details);
  }, []);
  return (
    <ChatProvider>
      <Box w="100vw" h="100vh" p={0} m={0}>
        <Bars />
        <Box
          w="100vw"
          h="full"
          display={{ base: "", md: "flex" }}
          height="100%"
        >
          <FriendList />
          <Chats />
        </Box>
      </Box>
    </ChatProvider>
  );
};

export default ChatScreen;
