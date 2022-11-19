import React, { useState } from 'react'

import { Flex, Container, Button, Spacer, Input } from '@chakra-ui/react'
import { isEmail } from '../../utils/email'
import InviteTag from './InviteTag'
import InvitesListProvider, { useInvitesListContext } from './InviteListProvider'
import { Invite } from '../../types'
import InviteListRecomendations from './InviteListRecomendations'

type Props = {
  onSend(invites: Invite[]): void
}

const InviteList = ({ onSend }: Props) => {
  const { hasInvites, addInvite, invites, deleteInvite } = useInvitesListContext()
  const [email, setEmail] = useState('')

  const onEmailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value
    setEmail(email)
  }

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    if (key === 'Enter' && isEmail(email)) {
      addInvite({ email })
      setEmail('')
      return
    }

    if (key === 'Backspace' && hasInvites) {
      deleteInvite(invites[invites.length - 1].email)
      return
    }
  }

  const onSendClickHandler = () => {
    onSend(invites)
  }

  return (
    <>
      <Flex backgroundColor="brand.gray-700">
        <Container
          w="75%"
          borderWidth="1px"
          borderColor="brand.gray-500"
          borderRadius="brand.base"
          backgroundColor="brand.gray-900"
          m="0"
          p="0"
        >
          {invites.map((invite) => <InviteTag key={invite.email} {...invite}></InviteTag>)}
          <Input
            type='email'
            placeholder={hasInvites ? '' : 'Search names or emails...'}
            fontSize="brand.sm"
            border="none"
            color="brand.gray-100"
            height="8"
            _focusVisible={{
              border: "none"
            }}
            value={email}
            onChange={onEmailChangeHandler}
            onKeyDown={onKeyPressHandler}
          />
        </Container>
        <Spacer />
        <Button onClick={onSendClickHandler} disabled={hasInvites ? false : true}>Invite</Button>
      </Flex>
      <Flex>
        
          <InviteListRecomendations keyword={email} onClick={(invite) => { 
            addInvite(invite)
            setEmail('')
          }} />
        
        <Spacer/>
      </Flex>
    </>
  )
}

const InviteListContainer = (props: Props) => (
  <InvitesListProvider>
    <InviteList {...props} />
  </InvitesListProvider>
)

export default InviteListContainer 