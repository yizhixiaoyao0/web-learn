import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  // 通过provider组件 将 store 放在了全局的组件可以够的到的地方
  <Provider store={store}><App/></Provider>,
  document.getElementById('root')
);

/*
  react-redux
    Provider
    connect
*/