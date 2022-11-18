import React from 'react';
import { ChakraProvider, Center } from '@chakra-ui/react'
import InvitePopIn, { InvitePopInProvider, InvitePopInOpenButton } from '../components/InvitePopIn';
import theme from '../theme/theme'
import '@fontsource/lato/400.css'

const App = () =>
  <ChakraProvider theme={theme}>
    <InvitePopInProvider>
      <Center h="100vh" w="100vw">
        <InvitePopInOpenButton />
      </Center>
      <InvitePopIn />
    </InvitePopInProvider>
  </ChakraProvider>

export default App;
