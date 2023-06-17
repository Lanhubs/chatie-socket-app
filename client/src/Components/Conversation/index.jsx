import { Box } from "@chakra-ui/react";
import React from "react";
import MessageBox from "../MessageBox";
import ChatMessage from "./ChatMessage";
import ConversationHeader from "./ConversationHeader";

const Chats = () => {
  return (
    <Box display={{base: "none", md: "block"}} w={{ base: "100vw", md: "55%", lg: "65%" }} bg="#fff" h="100vh">
      <ConversationHeader />
      <Box w="full" display="block" p="1rem" height="82%">
        <ChatMessage
          marginLeft="0"
          msgDir="row"
          positionTime=""
          sendersColor="#fff"
        />
        <ChatMessage
          marginLeft="auto"
          msgDir="row-reverse"
          sendersColor="#f3f3f3"
          positionTime="auto"
        />
      </Box>
      <MessageBox />
    </Box>
  );
};

export default Chats;
