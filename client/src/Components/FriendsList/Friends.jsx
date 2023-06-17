import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

import chatImg from "../../assets/user.png";
import cookie from "react-cookies";
import { ChatState } from "../ChatProvider/ChatProvider";
const Friends = ({ clickHandler }) => {
  const [friends, setFriends] = React.useState();
  const [chats, setChats] = React.useState();
  const { setSelectedChat, searchResults, setSearchResults, chatLoading, setChangeComponent } =
    ChatState();
  React.useEffect(() => {
    const token = cookie.load("Chatie");
    fetch("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 2000) {
          setSearchResults(data.users);
        }
      })
      .catch((e) => console.log(e));
  }, []);
  const accessChat = (userId) => {
    const token = cookie.load("Chatie");
    fetch("/api/chat/acccessChats", {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedChat(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Box
      w="100%"
      flex={1}
      height="100%"
      bg="unset"
      pos="relative"
      display="flex"
      flexDirection="column"
      gap="1rem"
      onClick={clickHandler}
    >
      {chatLoading ? (
        <SearchLoader />
      ) : (
        <>
          {searchResults?.map((item, idx) => {
            return (
              <Box
                w="100%"
                _hover={{ bg: "rgba(255, 255, 255, 0.3)" }}
                display="flex"
                color="#f1f1f1"
                alignSelf={"flex-start"}
                alignItems="center"
                height="70px"
                key={idx}
                onClick={() => {
                  accessChat(item._id);
                  setChangeComponent("messaging")
                }}
                gap="10px"
                px="1rem"
              >
                <Avatar
                  bgImage=""
                  w="50px"
                  bg="rgba(0, 0, 0, 0.5)"
                  borderRadius={50}
                  src={item?.profilePic}
                  h="50px"
                />
                <Box>
                  <Text fontSize={20} letterSpacing={1}>
                    {item?.firstName} {item?.lastName}
                  </Text>
                  <Text>lorem ipsum</Text>
                </Box>
                <Box
                  justifySelf="flex-end"
                  ml="auto"
                  bg="green.200"
                  width="10px"
                  height="10px"
                  rounded="full"
                />
              </Box>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default Friends;

const users = {
  name: "",
  image: "",
};
