import React, { useRef } from 'react'
import { Flex, List, ListItem, Avatar, Container, Text, Divider, Center, Spacer } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { isEmail } from '../../utils/email';
import { Invite } from '../../types';
import { getFullName } from '../../utils/invites';
import useUsers from '../../queries/useUsers';

type Props = {
  keyword: string;
  onClick(invite: Invite): void
}

const InviteListRecomendations = ({ keyword, onClick }: Props) => {

  const usersQuery = useUsers(keyword)
  const usersRef = useRef<Invite[]>([])
  
  if (usersQuery?.isSuccess) {
    usersRef.current = usersQuery.data
  }

  let recomendations: Invite[] = [...usersRef.current]

  if (isEmail(keyword)) {
    recomendations = [{ email: keyword }, ...recomendations]
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
      px="0"
      py="0"
      overflow="scroll"
    >
      {recomendations.map((invite, index) => {
        const inviteName = getFullName(invite)
        return (
          <Container p="0" m="0" key={`${invite.email}-${invite.firstName}`}>
            <ListItem
              color="brand.gray-100"
              fontSize="brand.sm"
              py="2"
              px="4"
              cursor="pointer"
              onClick={() => onClick(invite)}
              _hover={{
                backgroundColor: "brand.gray-500-transparent"
              }}
            >
              <Flex>
                {inviteName ? <Avatar
                  size={"xs"}
                  name={inviteName}
                  backgroundColor="brand.gray-500"
                  color="brand.gray-100"
                /> : <EmailIcon w="6" h="5" />}
                <Center ml="3">
                  <Text>{inviteName ? inviteName : invite.email}</Text>
                </Center>
              </Flex>
            </ListItem>
            {index + 1 !== recomendations.length ? <Center><Divider w="95%" /></Center> : null}
          </Container>
        )
      })}
    </List >
  )
}

export default InviteListRecomendations