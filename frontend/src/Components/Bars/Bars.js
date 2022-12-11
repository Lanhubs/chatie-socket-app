import { Avatar, Box, Flex, Image, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as AnchorComponent } from "react-router-dom";
import userImg from "../../assets/user.png";

import {
  AiOutlineMessage,
  AiOutlineLogout,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineMail,
  AiOutlineSetting,
} from "react-icons/ai";
const Bars = () => {
  const [userImage, setUserImage] = useState("")
useEffect(()=>{
  const img = JSON.parse(localStorage.getItem("chatie"))
  setUserImage(img.profilePic)
},[userImage])
  return (
    <Box
      border={0}
      w={{ base: "full", md: "5%", lg: "5%" }}
      h={{ md: "100vh", base: "7%" }}
      bg="rgba(0, 0, 0, 0.8)"
      p={{ base: 0, md: "3rem 1rem" }}
      pos="fixed"
      m={0}
      display="flex"
      top={{ md: 0, base: "" }}
      left={0}
      bottom={{ base: 0, md: "" }}
      alignItems="center"
      flexDir={{ md: "column", base: "row" }}
      gap={"2rem"}
    >
      <Avatar
        width="50px"
        display={{ base: "none", md: "block" }}
        src={userImage ? userImage : userImg}
        overflow="hidden"
        borderRadius={50}
      />
      <Box
        display="flex"
        alignItems={{ base: "center", md: "" }}
        h={{ base: "100%", md: "100%" }}
        flexDir={{ md: "column", base: "row" }}
        gap="1rem"
      >
        {barLinks.map((item, index) => (
          <Link
            padding={{ base: "10px", md: "" }}
            key={index}
            as={AnchorComponent}
            fontSize={30}
            color="rgba(255, 255, 255, 0.5)"
            justifySelf={barLinks.length === index + 1 ? "flex-end" : ""}
            marginTop={{
              base: "",
              md: barLinks.length === index + 1 ? "auto" : "",
            }}
            to={item.link}
          >
            {item.icon}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

const barLinks = [
  {
    icon: <AiOutlineMessage />,
    links: "/",
  },
  {
    icon: <AiOutlineUser />,
    link: "/",
  },
  {
    icon: <AiOutlineUsergroupAdd />,
    link: "/",
  },
  {
    icon: <AiOutlineMail />,
    link: "/",
  },
  {
    icon: <AiOutlineSetting />,
    link: "/",
  },
  {
    icon: <AiOutlineLogout />,
    link: "/authentication",
  },
];
export default Bars;
