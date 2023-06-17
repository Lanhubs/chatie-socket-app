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
import SearchLoader from "../SideBarDrawer";
const Chats = ({ clickHandler }) => {
  const [chats, setChats] = React.useState();
  const { chatLoading } = ChatState();
  React.useEffect(() => {
    const token = cookie.load("Chatie");
    fetch("/api/chat/getchats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        if (data.status === 2000) {
          setChats(data.results);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Box
      w="100%"
      flex={1}
      bg="unset"
      display="flex"
      flexDirection="column"
      gap="1rem"
      onClick={clickHandler}
    >
      {chatLoading ? (
        <SearchLoader />
      ) : (
        <>
          {/*  {chats?.map((item, idx) => {
               return (
                 <Box
                   w="100%"
                   _hover={{ bg: "rgba(255, 255, 255, 0.3)" }}
                   display="flex"
                   cursor={"pointer"}
                   onClick={() => {}}
                   color="#f1f1f1"
                   alignSelf={"flex-start"}
                   alignItems="center"
                   height="70px"
                   key={idx}
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
             })} */}
        </>
      )}
    </Box>
  );
};

export default Chats;

const users = {
  name: "",
  image: "",
};
