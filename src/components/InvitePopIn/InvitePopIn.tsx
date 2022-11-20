import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  ModalBody,
  Text,
  Center,
  Container,
  Spacer,
  Flex,
} from '@chakra-ui/react'
import {
  useInvitePopInActions,
  useIsInvitePopInOpen,
} from './InvitePopInProvider'
import InvitesInput, {
  InvitesInputSelect,
  InvitesInputSubmitButton,
  InvitesInputText,
} from '../InvitesInput'
import { Invite } from '../../types'

type Props = {
  onSubmit(Invite: Invite[]): void
}

const InvitePopIn = ({ onSubmit }: Props) => {
  const isOpen = useIsInvitePopInOpen()
  const { close } = useInvitePopInActions()
  const onSubmitHandler = (invites: Invite[]) => {
    onSubmit(invites)
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
          <Text fontSize="brand.sm" color="brand.gray-300" mb="6">
            Send members an email invitation to join this workspace
          </Text>
          <InvitesInput onSubmit={onSubmitHandler}>
            <Flex>
              <Container w="75%" p="0" m="0">
                <InvitesInputText />
              </Container>
              <Spacer />
              <Center>
                <InvitesInputSubmitButton>Invite</InvitesInputSubmitButton>
              </Center>
            </Flex>
            <Flex>
              <Container w="75%" p="0" m="0">
                <InvitesInputSelect />
              </Container>
              <Spacer />
            </Flex>
          </InvitesInput>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default InvitePopIn
