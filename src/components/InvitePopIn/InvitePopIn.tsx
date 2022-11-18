import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react'
import { useInvitePopInActions, useIsInvitePopInOpen } from './InvitePopInProvider'


const InvitePopIn = () => {
  const isOpen = useIsInvitePopInOpen()
  const { close } = useInvitePopInActions()
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invite Members</ModalHeader>
        <ModalBody pb={6}>
          Email invite
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default InvitePopIn