import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  overlay: {
    background: '#00000038',
  },
  dialog: {
    borderRadius: 'brand.base',
    bg: 'brand.gray-700',
    px: 16,
    py: 16,
  },
  body: {
    px: 0,
    py: 0,
  },
})

const Modal = defineMultiStyleConfig({
  baseStyle,
})

export default Modal
