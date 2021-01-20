import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "../share/routes";
import { Provider } from "react-redux";
import store from "./createStore";

// hydrate 方法不会更改现有DOM结构 只会和现有DOM结构进行对比 如果有差异 报警告 但是依然会为结构附加事件
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
