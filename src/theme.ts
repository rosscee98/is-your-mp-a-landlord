import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/500.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/400.css";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    fontFamily: "mono",
  },
});

const inputTheme = defineMultiStyleConfig({ baseStyle });

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bg: "pink.100",
      },
      ".text-red": {
        color: "red",
      },
    },
  },
  fonts: {
    heading: `Outfit, sans-serif`,
    body: `Lato, sans-serif`,
  },
  components: {
    Input: inputTheme,
  },
});
