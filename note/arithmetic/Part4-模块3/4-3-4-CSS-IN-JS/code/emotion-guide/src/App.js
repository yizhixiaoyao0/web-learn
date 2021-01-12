import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

const primaryColor = props => css`
  color: ${props.colors.primary}
`

function App() {
  console.log(useTheme());
  return <div css={primaryColor}>App works</div>;
}

export default App;

