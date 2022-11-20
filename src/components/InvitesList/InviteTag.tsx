import React from 'react'
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagCloseButton,
  Avatar,
  Fade,
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'

import { Invite } from '../../types'
import { useInvitesListContext } from './InviteListProvider'
import { getFullName } from '../../utils/invites'

type Props = {
  tabIndex?: number
  invite: Invite
}

const InviteTag = ({ tabIndex, invite }: Props) => {
  const { deleteInvite } = useInvitesListContext()
  const { email, firstName, lastName } = invite
  const inviteName = getFullName(invite)
  return (
    <Tag
      backgroundColor="transparent"
      borderColor="brand.red-100"
      borderWidth="1px"
      px="3"
      py="1"
      m="0.5"
      color="brand.red-100"
      fontSize="brand.xs"
    >
      {inviteName ? (
        <Avatar
          name={firstName || lastName}
          size="brand-xs"
          backgroundColor="brand.red-100"
          color="brand.gray-100"
          marginRight="10px"
        />
      ) : (
        <TagLeftIcon w={5} h={5} as={EmailIcon} />
      )}
      <TagLabel>{inviteName ? inviteName : email}</TagLabel>
      <TagCloseButton tabIndex={tabIndex} onClick={() => deleteInvite(email)} />
    </Tag>
  )
}

export default InviteTag
