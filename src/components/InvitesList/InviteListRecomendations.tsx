import React, { useRef, forwardRef } from 'react'
import { Flex, List, ListItem, Avatar, Text, Center, Collapse, Container } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { isEmail } from '../../utils/email';
import { Invite } from '../../types';
import { getFullName } from '../../utils/invites';
import useUsers from '../../queries/useUsers';

type Props = {
  keyword: string;
  onSelect(invite: Invite): void
  tabIndex?: number
}

const InviteListRecomendations = forwardRef<HTMLLIElement, Props>(({ keyword, onSelect }, ref) => {

  const usersQuery = useUsers(keyword)
  const usersRef = useRef<Invite[]>([])

  if (usersQuery?.isSuccess) {
    usersRef.current = usersQuery.data
  }

  let recomendations: Invite[] = [...usersRef.current]

  if (isEmail(keyword)) {
    recomendations = [{ email: keyword }, ...recomendations]
  }

  const hasRecomendations = recomendations.length > 0


  const onKeyDownHandler = (invite: Invite) => (event: React.KeyboardEvent<HTMLLIElement>) => {
    const { key, target } = event
    if (key === 'Enter') {
      onSelect(invite)
      return;
    }

    if (target instanceof Element) {
      if (key === 'ArrowDown') {
        if (target.nextElementSibling) {
          (target.nextElementSibling as HTMLElement)?.focus()
        } else {
          (target?.parentElement?.childNodes[0] as HTMLElement)?.focus()
        }
        return
      }

      if (key === "ArrowUp") {
        if (target.previousElementSibling) {
          (target.previousElementSibling as HTMLElement)?.focus()
        }
        else {
          (target?.parentElement?.childNodes[target.parentElement.childNodes.length - 1] as HTMLElement)?.focus()
        }
        return
      }
    }

  }

  const onClickHandler = (invite: Invite) => () => {
    onSelect(invite)
  }

  return (
    <Collapse in={hasRecomendations}>
      <List
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
            <ListItem
              ref={index === 0 ? ref : undefined}
              key={`${invite.email}-${invite.firstName}`}
              role="button"
              color="brand.gray-100"
              fontSize="brand.sm"
              py="2"
              px="4"
              cursor="pointer"
              tabIndex={index + 1}
              onClick={onClickHandler(invite)}
              onKeyDown={onKeyDownHandler(invite)}
              _hover={{
                backgroundColor: "brand.gray-500-transparent"
              }}
              _focus={{
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
          )
        })}
      </List >
    </Collapse>
  )
})

export default InviteListRecomendations