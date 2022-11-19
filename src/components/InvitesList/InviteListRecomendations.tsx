import React from 'react'
import { Flex, List, ListItem, Avatar, Container, Text, Divider } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { isEmail } from '../../utils/email';
import { Invite } from '../../types';
import { getFullName } from '../../utils/invites';

type Props = {
  keyword: string;
  onClick(invite: Invite): void
}

const InviteListRecomendations = ({ keyword, onClick }: Props) => {

  const recomendations: Invite[] = []

  if (isEmail(keyword)) {
    recomendations.push({ email: keyword })
  }

  if (recomendations.length === 0) { return null }


  return (
    <List
      w="75%"
      maxH="200px"
      borderWidth="1px"
      borderColor="brand.gray-500"
      backgroundColor="brand.gray-900"
      marginTop="0.5"
      px="2"
      py="1"
      overflow="scroll"
    >
      {recomendations.map((invite,index) => {
        const inviteName = getFullName(invite)
        return (
          <>
            <ListItem
              color="brand.gray-100"
              fontSize="brand.sm"
              p="1"
              cursor="pointer"
              key={`${invite.email}-${invite.firstName}`}
              onClick={() => onClick(invite)}
              _hover={{
                backgroundColor: "brand.gray-500"
              }}
            >
              <Flex>
                <Container w="10%">
                  {inviteName ? <Avatar name={inviteName} /> : <EmailIcon />}
                </Container>
                <Container w="90%">
                  <Text>{inviteName ? inviteName : invite.email}</Text>
                </Container>
              </Flex>

            </ListItem>
            { index + 1 !== recomendations.length ? <Divider /> : null }
          </>
        )
      })}
    </List >
  )
}

export default InviteListRecomendations