import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import counter from './stores/counterStore';

ReactDOM.render(
  <Provider counter={counter}><App /></Provider>,
  document.getElementById('root')
);

