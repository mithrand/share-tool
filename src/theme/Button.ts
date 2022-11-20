import { defineStyleConfig } from '@chakra-ui/react'

const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: '700',
    borderRadius: 'brand.base',
  },
  // Two sizes: sm and md
  sizes: {
    md: {
      fontSize: 'brand.sm',
      px: 6,
      py: 2.5,
      height: '36px',
    },
  },
  variants: {
    solid: {
      bg: 'brand.blue-100',
      color: 'white',
      _active: {
        backgroundColor: 'brand.blue-100',
      },
      _hover: {
        backgroundColor: 'brand.blue-200',
      },
      _disabled: {
        backgroundColor: 'gray.100',
        borderColor: 'gray.100',
        color: 'gray.500',
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
})

export default Button
