import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import userImg from "../../../assets/user.png";
const ChatMessage = ({ marginLeft, msgDir, positionTime, sendersColor }) => {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexDir={msgDir}
        w={{ base: "45%", md: "20px" }}
        marginLeft={marginLeft}
      >
        <Avatar src={userImg} />
        <Flex flexDir="column">
          <Text
            bg={sendersColor}
            rounded={5}
            boxShadow="md"
            p="10px"
            w={{ base: "100%", md: "300px" }}
          >
            hey how far
          </Text>
          <Text my="5px" ml={positionTime}>
            20 mins ago
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default ChatMessage;
