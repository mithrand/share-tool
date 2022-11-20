import { avatarAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(avatarAnatomy.keys)

const brandXs = defineStyle({
  width: '17px',
  height: '17px',
  fontSize: 'brand.xs',
})

const sizes = {
  'brand-xs': definePartsStyle({ container: brandXs }),
}

const AvatarTheme = defineMultiStyleConfig({ sizes })

export default AvatarTheme
