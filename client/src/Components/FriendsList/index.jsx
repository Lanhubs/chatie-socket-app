import React from "react";
import { Box, Text } from "@chakra-ui/react";
import FriendListHeader from "./FriendListHeader";
import Friends from "./Friends";

const FriendList = () => {
  return (
    <Box
    display="flex"
    flexDirection="column"
    gap="1rem"
      ml={{ base: 0, md: "5%" }}
      w={{ base: "100vw", md: "30%" }}
      h={{ base: "100%", md: "100vh" }}
      bg="rgba(0, 0, 0, 0.7)"
      border={0}
    >
      <FriendListHeader />
      <Friends />
    </Box>
  );
};

export default FriendList;
