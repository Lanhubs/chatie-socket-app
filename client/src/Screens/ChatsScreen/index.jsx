import { Box } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../Components/atoms";
import Bars from "../../Components/Bars/";
import { ChatState } from "../../Components/ChatProvider/ChatProvider";
import Chats from "../../Components/Conversation/index";
import FriendList from "../../Components/FriendsList";

const ChatScreen = () => {
  const setUser = useSetRecoilState(userState)
  const navigate = useNavigate();
  useEffect(() => {
    const userDetails = localStorage.getItem("chatie")
    const data = JSON.parse(userDetails)
    if(!userDetails || !data){
      navigate("/authentication")
    }
    setUser(data.details)

  }, []);
  return (
    <Box w="100vw" h="100vh" p={0} m={0}>
      <Bars />
      <Box w="100vw" h="full" display={{ base: "", md: "flex" }} height="100%">
        <FriendList />
        <Chats />
      </Box>
    </Box>
  );
};

export default ChatScreen;
