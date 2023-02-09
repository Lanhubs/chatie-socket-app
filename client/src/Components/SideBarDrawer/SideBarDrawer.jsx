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
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  Spinner,
} from "@chakra-ui/react";
import { Search2Icon, SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { ChatState } from "../ChatProvider/ChatProvider";
import SearchLoader from "./SearchAnimation";
import UserItem from "./UserItem/UserItem";

const SideBarDrawer = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [focused, setFocused] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const { user, setSelectedChat, selectedChat, setChats, chats } = ChatState();
  const [search, setSearch] = useState();

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const accessChat = (id) => {
    setLoading(true);
    fetch("http://localhost:5000/api/accesschat", {
      method: "POST",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${id}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!chats.find((c) => c._id === data._id)) setChats([...data, chats]);
        setSelectedChat(data);
        setLoading(false);
        onClose();
      })
      .catch((e) => console.log(e));
  };
  const handleSearch = () => {
    setLoading(true);
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
      .then((data) => setSearchResult(data))
      .catch((e) => {
        toast({
          title: "Error Occurred",
          description: "Failed to load search results",
          status: "error",
          duration: 3000,
          isClossable: true,
        });
      console.log(e)
      });
      
  };
  return (
    <>
      <Tooltip
        label="search users or chats"
        placement="bottom-end"
        hasArrow={true}
      >
        <span onClick={onOpen}>{children}</span>
      </Tooltip>
      <Drawer
        placement="left"
        isOpen={isOpen}
        closeOnOverlayClick={true}
        closeOnEsc={true}
        onClose={onclose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search for user</DrawerHeader>
          <DrawerBody>
            <Flex>
              <FormControl>
                <InputGroup>
                  <Input
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder={"search user"}
                    autoFocus={focused}
                  />
                  <Button
                    as={Button}
                    onClick={handleSearch}
                    bg="cyan.700"
                    padding="5px"
                    children={<Search2Icon />}
                  ></Button>
                </InputGroup>
              </FormControl>
            </Flex>
            {loading ? (
              <SearchLoader />
            ) : (
              <>
                {searchResult?.map((item, idx) => (
                  <UserItem
                    user={item}
                    key={idx}
                    clickHandler={() => accessChat(item._id)}
                  />
                ))}
              </>
            )}
            {loading && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBarDrawer;
