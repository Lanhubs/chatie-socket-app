import { Drawer, DrawerBody, DrawerContent, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const index = ({children}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <>
    <span onFocus={onOpen}>
    {children}
    </span>
    <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerBody>
            <DrawerContent>
                
            </DrawerContent>
        </DrawerBody>
    </Drawer>
    </>
  )
}

export default index