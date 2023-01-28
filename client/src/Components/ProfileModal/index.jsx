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
const ProfileModal = ({ children }) => {
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
          >
            <Avatar src={userImage} w="100px" h="100px"></Avatar>
            <Text fontSize={20}> Jack Hallow</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
