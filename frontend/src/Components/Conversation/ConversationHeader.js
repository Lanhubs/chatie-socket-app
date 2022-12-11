import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Text,

} from "@chakra-ui/react";
import React from "react";
import {AiOutlinePhone, AiOutlineVideoCamera} from "react-icons/ai"
const ConversationHeader = () => {
  return (
    <Box
      w="full"
      px="1rem"
      h="10%"
      borderBottom="2px solid rgba(0, 0, 0, 0.2)"
      display="flex"
      alignItems="center"
      py="1rem"
      justifyContent="space-between"
    >
      <Text>
        Alan Walker <span></span>
      </Text>
      <Flex alignItems="center" gap="1rem" >
        <Button outlineColor={0} outlineOffset="0">
          <AiOutlineVideoCamera/>
        </Button>
        <Button outlineColor={0} outlineOffset="0">
          <AiOutlinePhone/>
        </Button>       
        
      </Flex>
    </Box>
  );
};

export default ConversationHeader;
