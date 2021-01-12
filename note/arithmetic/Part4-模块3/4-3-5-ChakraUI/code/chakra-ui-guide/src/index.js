import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import theme from "@chakra-ui/theme";
import { ChakraProvider, CSSReset } from "@chakra-ui/core";
import LaGouComponents from './LaGou';

// 1. 设置默认颜色模式 
// theme.config.initialColorMode = 'dark';

// 2. 使用操作系统所使用的颜色模式
// theme.config.useSystemColorMode = true;

console.log(theme);

const myTheme = {
  ...theme,
  components: {
    ...theme.components,
    ...LaGouComponents
  }
}

console.log(myTheme)

ReactDOM.render(
  <ChakraProvider theme={myTheme}>
    <CSSReset />
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
