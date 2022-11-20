import React, { ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme/theme'

export const Wrapper = ({ children }: { children: ReactNode }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)
