import { ViewIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import userImage from "../../assets/user.png";
import { ChatState } from "../ChatProvider/ChatProvider";
const ProfileModal = ({ children, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d="flex"
          alignItems="center"
          justifyContent="center"
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal
        isOpen={isOpen}
        closeOnOverlayClick={onOpen}
        onClose={onClose}
        closeOnEsc={true}
        isCentered={true}
      >
        <ModalOverlay bg="rgba(0, 0, 0, 0.3)" />
        <ModalContent width={{ base: "95%", md: "40%" }}>
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            py="1rem"
            textTransform="capitalize"
          >
            <Avatar src={user?.profilePic} w="100px" h="100px"></Avatar>
            <Text fontSize={20} my="10px"> nickname:  {user?.nickname}</Text>
            <Text fontSize={20} my="10px"> Full name:  {user?.firstname} {" "} {user?.lastName}</Text>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
