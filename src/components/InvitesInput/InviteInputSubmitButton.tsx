import React, { ReactNode } from 'react'

import {
  Button,
} from '@chakra-ui/react'
import { useInvitesListContext } from './InvitesInput'

type Props = {
  children: ReactNode
}

export const InviteInputSubmitButton = ({ children }: Props) => {

  const {
    hasInvites,
    invites,
    submit,
  } = useInvitesListContext()
  
  return (
    <Button
      tabIndex={invites.length + 3}
      onClick={submit}
      disabled={hasInvites ? false : true}
    >
      {children}
    </Button>
  )
}