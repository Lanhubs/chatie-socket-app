import React, { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState("");
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal
        isOpen={isOpen}
        onClose={onclose}
        closeOnEsc={true}
        closeOnOverlayClick={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create group chat</ModalHeader>
          <ModalBody>
          <InputGroup borderColor="cyan.400" border="1.7px solid" rounded="md">
          <Input outline={0} placeholder="group name" />
          <Button>
            Create
          </Button>
          </InputGroup>  
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} colorScheme="cyan">
              close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
