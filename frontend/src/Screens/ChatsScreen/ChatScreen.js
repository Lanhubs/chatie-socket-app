import { Box} from "@chakra-ui/react";
import React from "react";
import Bars from "../../Components/Bars/Bars";
import { ChatProvider } from "../../Components/ChatProvider/ChatProvider";
import Chats from "../../Components/Conversation/Chats";
import FriendList from "../../Components/FriendsList/FriendList";

const ChatScreen = () => {
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
