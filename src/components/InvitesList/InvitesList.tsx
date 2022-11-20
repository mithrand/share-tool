import React, { useState, createRef } from 'react'

import { Flex, Container, Button, Spacer, Input, Center } from '@chakra-ui/react'
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
  const [keyword, setKeyword] = useState('')

  const add = (inivite: Invite) => {
    addInvite(inivite)
    setKeyword('')
  }

  const recomendationListRef = createRef<HTMLLIElement>()
  const inputRef = createRef<HTMLInputElement>()

  const onKeywordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value
    setKeyword(keyword)
  }

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    if (key === 'Enter' && isEmail(keyword)) {
      add({ email: keyword })
      return
    }

    if (key === 'Backspace' && hasInvites && !keyword) {
      deleteInvite(invites[invites.length - 1].email)
      return
    }

    if (key === "ArrowDown" && recomendationListRef.current) {
      recomendationListRef.current.focus()
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
          onClick={() => inputRef.current?.focus()}
        >
          {invites.map((invite, index) => <InviteTag tabIndex={index + 1} key={invite.email} invite={invite}></InviteTag>)}
          <Input
            type='email'
            ref={inputRef}
            tabIndex={1}
            placeholder={hasInvites ? '' : 'Search names or emails...'}
            fontSize="brand.sm"
            border="none"
            color="brand.gray-100"
            height="8"
            maxWidth="100%"
            width={!hasInvites ? '100%' : `${(keyword.length + 10).toString()}ch`}
            _focusVisible={{
              border: "none"
            }}
            value={keyword}
            onChange={onKeywordChangeHandler}
            onKeyDown={onKeyPressHandler}
          />
        </Container>
        <Spacer />
        <Center>
          <Button tabIndex={invites.length + 3} onClick={onSendClickHandler} disabled={hasInvites ? false : true}>Invite</Button>
        </Center>
      </Flex>
      <Flex>
        <Container w="75%" p="0" m="0">
          <InviteListRecomendations ref={recomendationListRef} tabIndex={invites.length + 2} keyword={keyword} onSelect={add} />
        </Container>
        <Spacer />
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