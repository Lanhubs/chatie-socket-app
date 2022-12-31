import { Box, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import Bars from "../../Components/Bars/Bars";
import { userInfo } from "../../Components/ChatProvider/chatAtoms";
import Chats from "../../Components/Conversation/Chats";
import FriendList from "../../Components/FriendsList/FriendList";
import ProfileModal from "../../Components/ProfileModal/ProfileModal";

const ChatScreen = () => {
  const { showProfile, setShowProfile, closeShowProfile } = useDisclosure();
  
  const navigate = useNavigate()
  const {user, setUser}= useRecoilState(userInfo)
  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("chatie"))
    setUser(userInfo)
    if(userInfo.length === 0|| userInfo === null || userInfo === undefined || !localStorage.getItem("chatie")){
      navigate("/authentication")
    }
    
  },[user])

  return (

    <>
      <Box w="100vw" h="100vh" p={0} m={0}>
        <Bars userImage={user.profilePic}/>
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
      <ProfileModal
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        closeShowProfile={closeShowProfile}
        />
    </>
        
  );
};

export default ChatScreen;
