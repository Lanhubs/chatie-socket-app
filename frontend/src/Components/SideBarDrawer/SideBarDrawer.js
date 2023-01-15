import React from "react";
import {
  Box,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
const SideBarDrawer = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="search users or chats" hasArrow placement="bottom-end">
        <span onClick={isOpen}>{children}</span>
      </Tooltip>
      <Box
        as={Flex}
        width={isOpen?"3rem":0}
        flexDir="column"
        py="1rem"
        position="fixed"
        transition="ease-in-out 1s"
      >
        <Flex>
          <FormControl>
            <InputGroup>
              <Input />
              <InputRightAddon>
                <Button as={Search2Icon} bg="cyan.700" padding="5px" />
              </InputRightAddon>
            </InputGroup>
          </FormControl>
        </Flex>
      </Box>
    </>
  );
};

export default SideBarDrawer;
