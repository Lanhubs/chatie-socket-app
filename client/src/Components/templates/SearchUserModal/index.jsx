import {
  Drawer,
  DrawerBody,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const index = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <span onFocus={onOpen}>{children}</span>
      <Modal></Modal>
    </>
  );
  
};

export default index;
