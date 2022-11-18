import { extendTheme } from "@chakra-ui/react";

import Button from "./Button";
import Modal from "./Modal";
import global from "./global";
import colors from "./colors";
import fontSizes from "./fontSizes";
import fonts from "./fonts";

const theme = extendTheme({
  styles: {
    global,
  },
  components: {
    Button,
    Modal,
  },
  colors,
  fontSizes,
  fonts,
  radii: {
    brand: {
      base: "0.625rem",
    },
  },
});

export default theme;
