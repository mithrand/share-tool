import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  ModalBody,
  Text,
  Center
} from '@chakra-ui/react'
import { useInvitePopInActions, useIsInvitePopInOpen } from './InvitePopInProvider'
import InviteListInput from '../InvitesListInput'

const InvitePopIn = () => {
  const isOpen = useIsInvitePopInOpen()
  const { close } = useInvitePopInActions()
  return (
    <Modal isOpen={isOpen} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent maxW="528px">
        <ModalBody>
          <Center><Heading fontWeight="normal" as="h2" fontSize="brand.xl" color="brand.gray-100" mb="8">Invite members</Heading></Center>
          <Text fontSize="brand.md" color="brand.gray-100" mb="4">Email invite</Text>
          <Text fontSize="brand.sm" color="brand.gray-100" mb="6">Send members an email invitation to join this workspace</Text>
          <InviteListInput />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default InvitePopIn