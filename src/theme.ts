import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/500.css";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    fontFamily: "mono",
    // background: "black",
    // border: "2px solid black",
  },
});

const inputTheme = defineMultiStyleConfig({ baseStyle });

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bg: "#eae9e0",
      },
      ".text-red": {
        color: "red",
      },
    },
  },
  fonts: {
    heading: `Outfit, sans-serif`,
  },
  components: {
    Input: inputTheme,
    Button: {
      defaultProps: {
        // bg: "blue",
      },
      // color: "#eae9e0",
    },
  },
});
