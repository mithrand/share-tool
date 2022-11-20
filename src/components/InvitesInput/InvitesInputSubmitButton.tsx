import React, { ReactNode } from 'react'

import {
  Button,
} from '@chakra-ui/react'
import { useInvitesListContext } from './InvitesInput'

type Props = {
  children: ReactNode
}

export const InvitesInputSubmitButton = ({ children }: Props) => {

  const {
    hasInvites,
    invites,
    submit,
  } = useInvitesListContext()
  
  return (
    <Button
      role="button"
      tabIndex={invites.length + 3}
      onClick={submit}
      disabled={hasInvites ? false : true}
    >
      {children}
    </Button>
  )
}