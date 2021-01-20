import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "../share/routes";
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  );
  const initialState = serialize(store.getState());
  const helmet = Helmet.renderStatic();
  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">${content}</div>
        <script>window.INITIAL_STATE = ${initialState}</script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};
