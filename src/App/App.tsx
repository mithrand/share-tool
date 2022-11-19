import React from 'react';
import { ChakraProvider, Center, useToast } from '@chakra-ui/react'

import InvitePopIn, { InvitePopInProvider, InvitePopInOpenButton } from '../components/InvitePopIn';
import theme from '../theme/theme'
import '@fontsource/lato/400.css'
import { Invite } from '../types';

const App = () => {
  const toast = useToast()

  const onSendHandler = (invites: Invite[]) => {
    toast({
      title: 'Invites sent',
      status: 'success',
      description: `Invites has been sent to ${invites.map(inv => inv.email).join(', ')}`,
      duration: 9000,
      isClosable: true,
      position: "top"
    })
  }

  return (
    <ChakraProvider theme={theme}>
      <InvitePopInProvider>
        <Center h="100vh" w="100vw">
          <InvitePopInOpenButton />
        </Center>
        <InvitePopIn onSend={onSendHandler} />
      </InvitePopInProvider>
    </ChakraProvider >
  )
}

export default App;
