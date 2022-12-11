import { AddIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import userImg from "../../../assets/user.png";
import { userInfo } from "../../ChatProvider/chatAtoms";
const FriendListHeader = () => {
  const [search, setSearch] = useState("")
  const [userToken, setUserToken] = useState("")
  const setContacts = useSetRecoilState(userInfo)
  useEffect(()=>{
      const details= JSON.parse(localStorage.getItem("chatie"))
      setUserToken(details.token)

  }, [])
  const handleSearch = ()=>{
    fetch("", {
      Authorization: userToken ,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(search)

    }).then(res=>res.json())
    .then(data=> {
      setContacts(data)
    })

  }
  return (
    <Box w="full" p="10px" display="flex" flexDirection="column" gap="1rem">
      <Flex alignItems="center" justifyContent="space-between" px="10px">
        <Text fontSize={25}>Chatie</Text>
        <Avatar src={userImg} display={{ base: "flex", md: "none" }}>
          <AvatarBadge boxSize="10px" />
        </Avatar>
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
            onInput={e=>handleSearch(e)}
            placeholder="search"
            outlineOffset={0}
            border={0}
            bg="unset"
          />
        </Box>
        <Tooltip
          label="search"
          hasArrow
          placement="right-end"
          fontSize={15}
          padding="10px"
          bg="rgba(0, 0, 0, 0.5)"
        >
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
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default FriendListHeader;
