import {
  Avatar,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import userImage from "../../assets/user.png";
const ProfileModal = ({ showProfile, setShowProfile, closeShowProfile }) => {
  return (
    <Modal
      isOpen={showProfile}
      closeOnOverlayClick={setShowProfile}
      closeOnEsc={true}
      onClose={closeShowProfile}
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
  );
};

export default ProfileModal;
