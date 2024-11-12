"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "black",
        color: "white",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          bg: "green.600",
        },
      },
      variants: {
        solid: {
          bg: "green.500",
          color: "black",
        },
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
