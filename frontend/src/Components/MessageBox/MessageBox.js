import React from "react";
import { AiOutlineMessage, AiOutlineSend } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import {
  Box,
  Button,
  Input,
  InputGroup,
  
} from "@chakra-ui/react";
const MessageBox = () => {
  return (
    <Box
      w="full"
      height="7%"
      bottom={0}
      mt="auto"
      right={0}
      shadow="lg"
      display="flex"
      alignItems="center"
    >
      <InputGroup>
        <Input placeholder="send message...." p="10px" px="1rem"/>

        <Button fontSize={20}>{sendIcon}</Button>
        <Button
          bg="unset"
          outlineOffset={0}
          outlineColor="0"
          outline="none"
          fontSize={20}
        >
          {recordIcon}
        </Button>
      </InputGroup>
    </Box>
  );
};
const sendIcon = <AiOutlineSend />;
const recordIcon = <FaMicrophone />;
export default MessageBox;
