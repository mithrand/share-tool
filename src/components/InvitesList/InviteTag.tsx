import React from 'react'
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagCloseButton,
  Avatar
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'

import { Invite } from '../../types'
import { useInvitesListContext } from './InviteListProvider'

type Props = Invite

const InviteTag = ({ email, firstName, lastName }: Props) => {
  const { deleteInvite } = useInvitesListContext()
  return (
    <Tag backgroundColor="transparent" borderColor="brand.red-100" borderWidth="1px" px="3" py="1" m="0.5" color="brand.red-100" fontSize="brand.xs">
      {firstName || lastName ? <Avatar name={`${firstName} ${lastName}`}/> : <TagLeftIcon w={5} h={5} as={EmailIcon} />}
      <TagLabel>{firstName ? firstName : email}</TagLabel>
      <TagCloseButton onClick={() => deleteInvite(email)}/>
    </Tag>
  )
}

export default InviteTag