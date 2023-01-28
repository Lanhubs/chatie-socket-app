import { Box } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Bars from "../../Components/Bars/";
import {
  ChatProvider,
  ChatState,
} from "../../Components/ChatProvider/ChatProvider";
import Chats from "../../Components/Conversation/index";
import FriendList from "../../Components/FriendsList";

const ChatScreen = () => {
  const { user } = ChatState();
  const navigate = useNavigate()
 useEffect(()=>{
   if (!user) {
     navigate("/authentication")

   }
 },[])
  return (
    
      <Box w="100vw" h="100vh" p={0} m={0}>``
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
      
  );
};

export default ChatScreen;
