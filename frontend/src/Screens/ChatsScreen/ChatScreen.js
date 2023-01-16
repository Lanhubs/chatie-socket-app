import { Box, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import Bars from "../../Components/Bars/Bars";
import { ChatState } from "../../Components/ChatProvider/ChatProvider";
import Chats from "../../Components/Conversation/Chats";
import FriendList from "../../Components/FriendsList/FriendList";
import ProfileModal from "../../Components/ProfileModal/ProfileModal";

const ChatScreen = () => {
  const { showProfile, setShowProfile, closeShowProfile } = useDisclosure();
  
  const {user} = ChatState()

  return (

    <>
      <Box w="100vw" h="100vh" p={0} m={0}>
        <Bars userImage={user?.profilePic}/>
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
      
    </>
        
  );
};

export default ChatScreen;
