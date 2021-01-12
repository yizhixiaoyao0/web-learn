import React from "react";
import { chakra } from '@chakra-ui/core';

const LaGouButton = chakra('button', {
  themeKey: 'LaGouButton'
});

function App() {
  return <div>
    <LaGouButton size="md" variant="danger">我是按钮</LaGouButton>
  </div>;
}

export default App;
