import React from "react";
import { Box, Text } from "@chakra-ui/react";
import FriendListHeader from "./FriendListHeader";
import Friends from "./Friends";
import Chats from "./Chats";

import { ChatState } from "../ChatProvider/ChatProvider";

const FriendList = () => {
  const { changeComponent } = ChatState();
  return (
    <Box
      display={{base: changeComponent ==="messaging"? "none": "flex", md: "flex"}}

      flexDirection="column"
      gap="1rem"
      ml={{ base: 0, md: "7%", lg: "5%" }}
      w={{ base: "100vw", md: "30%" }}
      // flex={1}
      height="inherit"
      alignItems="flex-start"
      justifyContent="flex-start"
      bg="rgba(0, 0, 0, 0.7)"
      border={0}
    >
      <FriendListHeader />
      {changeComponent === "chats" ? <Chats /> : <Friends />}
    </Box>
  );
};

export default FriendList;
