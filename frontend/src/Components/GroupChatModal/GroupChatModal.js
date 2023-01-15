import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
const GroupChatModal = ({children}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [selectedUser, setSelectedUser] = useState("")
    const [groupName, setGroupName] = useState("")
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
  return (
    <>
    <span onClick={onOpen}>{children}</span>
    <Modal isOpen={isOpen} onClose={onclose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Create group chat</ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
                <Button onClick={onClose} mr={3} colorScheme="cyan">close</Button>
            </ModalFooter>
        </ModalContent>

    </Modal>
    </>
  )
}

export default GroupChatModal