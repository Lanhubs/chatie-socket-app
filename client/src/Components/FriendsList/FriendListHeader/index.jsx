import {
  AddIcon,
  PlusSquareIcon,
  Search2Icon,
  SearchIcon,
} from "@chakra-ui/icons";
import Cookies from "js-cookie";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import userImg from "../../../assets/user.png";
import { userState } from "../../atoms";
import { ChatState } from "../../ChatProvider/ChatProvider";

import GroupChatModal from "../../GroupChatModal";
import ProfileModal from "../../ProfileModal";
import SideBarDrawer from "../../SideBarDrawer";
const FriendListHeader = () => {

  const [search, setSearch] = useState("");
  const [userToken, setUserToken] = useState("");
  const user = useRecoilState(userState);
  useEffect(() => {
    const details = JSON.parse(Cookies.get("Chatie"));
    setUserToken(details.token);
  }, []);
  const handleSearch = () => {
    fetch(`https://localhost:5000/api/user?search=${search}`, {
      Authorization: `Bearer ${userToken}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(search),
    })
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
      });
  };
  return (
    <Box w="full" p="10px" display="flex" flexDirection="column" gap="1rem">
      <Flex alignItems="center" justifyContent="space-between" px="10px">
        <Text fontSize={25}>Chatie</Text>
        <ProfileModal>
          <Avatar
            cursor="pointer"
            src={userImg}
            display={{ base: "flex", md: "none" }}
          >
            <AvatarBadge boxSize="10px" />
          </Avatar>
        </ProfileModal>
      </Flex>

      <Flex gap="1rem">
        <Box
          width="70%"
          borderRadius="50"
          px="15px"
          height={"50px"}
          bg="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
        >
          <span>
            <SearchIcon color="rgba(255, 255, 255 , 0.5)" fontSize={20} />
          </span>
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
            onInput={(e) => handleSearch(e)}
            placeholder="search"
            outlineOffset={0}
            border={0}
            bg="unset"
          />
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
            bg="rgba(0, 0, 0, 0.5)"
            color="#fff"
            textTransform={"capitalize"}
            fontSize={18}
            h="50px"
          >
            <Text display={{ base: "none", md: "flex" }}>new groupchat</Text>{" "}
            <AddIcon ml={{ base: "", md: "10px" }} fontSize={16} />
          </Button>
        </GroupChatModal>
      </Flex>
    </Box>
  );
};

export default FriendListHeader;
