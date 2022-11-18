import React, { useState } from 'react'

import { Flex, Container, Button, Spacer, Input } from '@chakra-ui/react'
import { Invite } from './types'

const useInvites = () => {
  const [invites, setInvites] = useState<Invite[]>([])

  const addInvite = (invite: Invite) => setInvites([...invites, invite])
  const removeInvite = (invite: Invite) =>  setInvites(invites.filter(inv => inv.email !== invite.email))

  return {
    invites,
    hasInvites: invites.length > 0,
    addInvite,
    removeInvite,
  }
}

const InviteListInput = () => {
  const { hasInvites } = useInvites()
  return (
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
        <Input 
          type='email' 
          placeholder={ hasInvites ? '' : 'Search names or emails...'} 
          fontSize="brand.sm" 
          border="none"
          color="brand.gray-100"
          height="8"
          _focusVisible={{
            border: "none"
          }}
        />
      </Container>
      <Spacer />
      <Button disabled={hasInvites ? false : true }>Invite</Button>
    </Flex>
  )
}


export default InviteListInput 