import React from 'react'
import { useInvitePopInActions } from './InvitePopInProvider'
import { Button } from '@chakra-ui/react'

export const InvitePopInOpenButton = () => {
  const { open } = useInvitePopInActions()
  return <Button onClick={open}>Invite teammates</Button>
}
