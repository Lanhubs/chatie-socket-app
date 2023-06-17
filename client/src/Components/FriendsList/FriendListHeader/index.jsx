import {
  AddIcon,
  PlusSquareIcon,
  Search2Icon,
  SearchIcon,
} from "@chakra-ui/icons";
import cookie from "react-cookies";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Text,
  createStandaloneToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import userImg from "../../../assets/user.png";
import { ChatState } from "../../ChatProvider/ChatProvider";

import GroupChatModal from "../../GroupChatModal";
import ProfileModal from "../../ProfileModal";
import SideBarDrawer from "../../SideBarDrawer";
const FLEX = "flex" || "-ms-flexbox" || "-webkit-flex";
const FriendListHeader = () => {
  const [search, setSearch] = useState("");
  const [hideCreateGroupBtn, setHideCreateGroupBtn] = useState(true);
  const [userToken, setUserToken] = React.useState();
  const { toast, ToastContainer } = createStandaloneToast();
  const { user, setChatLoading, setSearchResults } = ChatState();
  useEffect(() => {
    var cook = cookie.load("Chatie");
    const token = cook;
    setUserToken(token);
  }, []);
  const handleSearch = () => {
    if (!search) {
      toast({
        title: "please enter in a keyword in the search box",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
    }
    try {
      setChatLoading(true);
      fetch(`/api/users?search=${search}`, {
        Authorization: `Bearer ${userToken}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setSearchResults(data);
        });
    } catch (e) {
      console.log(e);
    }
    setChatLoading(false);
  };
  return (
    <Box
      w="full"
      p="10px"
      h="15%"
      display={FLEX}
      flexDirection="column"
      gap="1rem"
    >
      <ToastContainer />
      <Flex alignItems="center" justifyContent="space-between" px="10px">
        <Text fontSize={25}>Chatie</Text>
        <ProfileModal user={user}>
          <Avatar
            cursor="pointer"
            src={user?.profilePic}
            display={{ base: "flex", md: "none" }}
          >
            <AvatarBadge boxSize="10px" />
          </Avatar>
        </ProfileModal>
      </Flex>

      <Flex gap="1rem">
        <Box
          height={"50px"}
          display="flex"
          alignItems="center"
          rowGap={"10px"}
          flex={1}
        >
          <InputGroup
            // width={hideCreateGroupBtn ? "90%" : "70%"}
            height={"100%"}
            alignItems={"center"}
            borderRadius="50"
            px="15px"
            bg="rgba(0, 0, 0, 0.5)"
          >
            <Input
              outlineColor={0}
              w="100%"
              outline="none"
              px="10px"
              color="rgba(255, 255, 255, 0.5)"
              focusBorderColor="0"
              _placeholder={{
                fontSize: 18,
                letterSpacing: 1.5,

                marginLeft: "20px",
                color: "rgba(255, 255, 255, 0.5)",
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onFocus={() => setHideCreateGroupBtn(false)}
              placeholder="search"
              outlineOffset={0}
              border={0}
              bg="unset"
            />
          </InputGroup>
          <Button
            rounded={"full"}
            w="50px"
            height={"50px"}
            ml="10px"
            bg="rgba(0, 0, 0, 0.5)"
            onClick={handleSearch}
          >
            <SearchIcon color="rgba(255, 255, 255 , 0.5)" fontSize={20} />
          </Button>
        </Box>
        <SideBarDrawer>
          <Button
            w="50px"
            height="50px"
            bg="rgba(0, 0, 0, 0.5)"
            _hover={{ background: "rgba(0, 0, 0, 0.4)" }}
            outlineColor=""
            outlineOffset={0}
            border={0}
            borderRadius={50}
          >
            <SearchIcon color="#fff" />
          </Button>
        </SideBarDrawer>
        <GroupChatModal>
          <Button
            display={hideCreateGroupBtn ? "flex" : "none"}
            bg="rgba(0, 0, 0, 0.5)"
            color="#fff"
            textTransform={"capitalize"}
            fontSize={18}
            h="50px"
          >
            <Text display={{ base: "none", md: "none", lg: "flex" }}>
              new groupchat
            </Text>
            <AddIcon ml={{ base: "", md: "10px" }} fontSize={16} />
          </Button>
        </GroupChatModal>
      </Flex>
    </Box>
  );
};

export default FriendListHeader;
