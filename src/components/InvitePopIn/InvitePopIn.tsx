import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  ModalBody,
  Text,
  Center,
} from '@chakra-ui/react'
import {
  useInvitePopInActions,
  useIsInvitePopInOpen,
} from './InvitePopInProvider'
import InviteListInput from '../InvitesList'
import { Invite } from '../../types'

type Props = {
  onSend(Invite: Invite[]): void
}

const InvitePopIn = ({ onSend }: Props) => {
  const isOpen = useIsInvitePopInOpen()
  const { close } = useInvitePopInActions()
  const onSendHandler = (invites: Invite[]) => {
    onSend(invites)
    close()
  }
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent maxW="528px" top="40">
        <ModalBody>
          <Center>
            <Heading
              fontWeight="normal"
              as="h2"
              fontSize="brand.xl"
              color="brand.gray-100"
              mb="8"
            >
              Invite members
            </Heading>
          </Center>
          <Text fontSize="brand.md" color="brand.gray-100" mb="4">
            Email invite
          </Text>
          <Text fontSize="brand.sm" color="brand.gray-100" mb="6">
            Send members an email invitation to join this workspace
          </Text>
          <InviteListInput onSend={onSendHandler} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default InvitePopIn
