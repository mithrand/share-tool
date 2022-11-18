import React from 'react';
import { ChakraProvider, Center } from '@chakra-ui/react'
import InvitePopIn, { InvitePopInProvider, InvitePopInOpenButton } from '../components/InvitePopIn';

const App = () =>
  <ChakraProvider>
    <InvitePopInProvider>
      <Center h="100vh" w="100vh">
        <InvitePopInOpenButton />
      </Center>
      <InvitePopIn />
    </InvitePopInProvider>
  </ChakraProvider>

export default App;
