import React from "react";
import {
  Box,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Tooltip,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";
import { ChatState } from "../ChatProvider/ChatProvider";

const SideBarDrawer = ({ children }) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const { user } = ChatState();
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleSearch = () => {
    if (!search) {
      toast({
        title: "please enter something you wish to search for",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    setLoading(true);
    fetch(`http://localhost:5000/api/chat/getchats?search=${search}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => {
        toast({
          title: "Error Occurred",
          description: "Failed to load search results",
          status: "error",
          duration: 3000,
          isClossable: true
        })
      });
  };
  return (
    <>
      <Tooltip
        label="search users or chats"
        placement="bottom-end"
        hasArrow={true}
      >
        <span onClick={() => setOpenSideBar(!true)}>{children}</span>
      </Tooltip>
      <Box
        bg="#fff"
        backgroundColor="#fff"
        zIndex={1000}
        width={"22em"}
        display={openSideBar ? "block" : "none"}
        top={0}
        left={0}
        flexDir="column"
        py="2rem"
        position="fixed"
        height="100vh"
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
