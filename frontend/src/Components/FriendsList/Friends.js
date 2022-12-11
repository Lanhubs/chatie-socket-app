import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Friends = () => {
  return (
    <Box
      w="100%"
      h="100%"
      bg="unset"
      display="flex"
      flexDirection="column"
      gap="1rem"
    >
      <Box
        w="100%"
        _hover={{ bg: "rgba(255, 255, 255, 0.3)"}}
        display="flex"
        color="#f1f1f1"
        alignItems="center"
        height="70px"
        gap="10px"
        px="1rem"
      >
        <Avatar
          bgImage=""
          w="60px"
          bg="rgba(0, 0, 0, 0.5)"
          borderRadius={50}
          h="60px"
        ></Avatar>
        <Box>
          <Text fontSize={20} letterSpacing={1}> Alan walker</Text>
          <Text>lorem ipsum</Text>
        </Box>
        <Box
          justifySelf="flex-end"
          ml="auto"
          bg="green.200"
          width="10px"
          height="10px"
        ></Box>
      </Box>
    </Box>
  );
};

export default Friends;

const users = {
  name: "",
  image: "",
};
