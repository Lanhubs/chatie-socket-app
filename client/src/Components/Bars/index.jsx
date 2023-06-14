import { Avatar, Box, Flex, Image, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as NaviigationLink } from "react-router-dom";
import userImg from "../../assets/user.png";

import {
  AiOutlineMessage,
  AiOutlineLogout,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineMail,
  AiOutlineSetting,
} from "react-icons/ai";

import ProfileModal from "../ProfileModal";
import { useRecoilState } from "recoil";
import { ChatState } from "../ChatProvider/ChatProvider";
const Bars = () => {
  const { user, setChangeComponent } = ChatState();

  return (
    <Box
      border={0}
      w={{ base: "100vw", md: "7%", lg: "5%" }}
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
      rowGap={"2rem"}
    >
      <ProfileModal user={user}>
        <Avatar
          cursor="pointer"
          width="50px"
          display={{ base: "none", md: "block" }}
          src={user?.profilePic}
          overflow="hidden"
          borderRadius={50}
        />
      </ProfileModal>
      <Box
        display="flex"
        alignItems={{ base: "center", md: "" }}
        h={{ base: "100%", md: "100%" }}
        flexDir={{ md: "column", base: "row" }}
        gap={{ base: "10%", md: "1rem" }}
      >
        {barLinks.map((item, index) => (
          <>
            {/*  {index === 1 ? (
              <>
                <Box
                  padding={{ base: "10px", md: "" }}
                  key={index}
                  onClick={() => console.log("hellow")}
                  fontSize={30}
                  color="rgba(255, 255, 255, 0.5)"
                  justifySelf={barLinks.length === index + 1 ? "flex-end" : ""}
                  marginTop={{
                    base: "",
                    md: barLinks.length === index + 1 ? "auto" : "",
                  }}
                >
                  {item.icon}
                </Box>
              </>
            ) : ( */}
            <Link
              padding={{ base: "10px", md: "" }}
              key={index}
              fontSize={30}
              color="rgba(255, 255, 255, 0.5)"
              justifySelf={barLinks.length === index + 1 ? "flex-end" : ""}
              marginTop={{
                base: "",
                md: barLinks.length === index + 1 ? "auto" : "",
              }}
              onClick={() =>
                item.name === "chats" ? setChangeComponent("chats") : ""
              }
              href={item.link}
            >
              {" "}
              {item.icon}{" "}
            </Link>
            {/* )} */}
          </>
        ))}
      </Box>
    </Box>
  );
};

const barLinks = [
  {
    icon: <AiOutlineMessage />,
    links: "#",
    name: "chats",
  },
  {
    icon: <AiOutlineUser />,
    link: "#",
    name: "",
  },
  {
    icon: <AiOutlineUsergroupAdd />,
    link: "#",
    name: "",
  },
  {
    icon: <AiOutlineMail />,
    link: "#",
    name: "",
  },
  {
    icon: <AiOutlineSetting />,
    name: "",
    link: "#",
  },
  {
    icon: <AiOutlineLogout />,
    name: "",
    link: "/authentication",
  },
];
export default Bars;
