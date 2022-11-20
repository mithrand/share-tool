import React, { createRef } from 'react'

import {
  Container,
  Input,
} from '@chakra-ui/react'
import { isEmail } from '../../utils/email'
import InvitesInputTag from './InvitesInputTag'
import { useInvitesListContext } from './InvitesInput'

export const InvitesInputText = () => {
  const {
    hasInvites,
    addInvite,
    invites,
    popInvite,
    keyword,
    setKeyword,
    selectInputRef,
  } = useInvitesListContext()

  const inputRef = createRef<HTMLInputElement>()

  const onKeywordChangeHandler = (
    { target: { value } }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setKeyword(value)
  }

  const onKeyPressHandler = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter' && isEmail(keyword)) {
      addInvite({ email: keyword })
      return
    }

    if (key === 'Backspace' && hasInvites && !keyword) {
      popInvite()
      return
    }

    if (key === 'ArrowDown' && selectInputRef.current) {
      selectInputRef.current.focus()
      return
    }
  }

  return (
    <Container
      role="group"
      borderWidth="1px"
      borderColor="brand.gray-500"
      borderRadius="brand.base"
      backgroundColor="brand.gray-900"
      m="0"
      p="0"
      onClick={() => inputRef.current?.focus()}
    >
      {invites.map((invite, index) => (
        <InvitesInputTag
          tabIndex={index + 1}
          key={invite.email}
          invite={invite}
        ></InvitesInputTag>
      ))}
      <Input
        type="email"
        role="textbox"
        ref={inputRef}
        tabIndex={1}
        placeholder={hasInvites ? '' : 'Search names or emails...'}
        fontSize="brand.sm"
        border="none"
        color="brand.gray-100"
        height="8"
        maxWidth="100%"
        width={
          !hasInvites ? '100%' : `${(keyword.length + 10).toString()}ch`
        }
        _focusVisible={{
          border: 'none',
        }}
        value={keyword}
        onChange={onKeywordChangeHandler}
        onKeyDown={onKeyPressHandler}
      />
    </Container>
  )
}