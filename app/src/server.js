/* eslint-disable react/no-danger */

import React from 'react';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import fetch from 'node-fetch';

import Layout from './shared/Layout';
import createApolloClient from './shared/service/graphql';
import configureStore from './shared/state/configureStore';
import { GtagInit } from './shared/service/analytics';

/**
 * Handle asset path retrieval.
 */
function getJsByChunkName(name, assetsByChunkName) {
  let assets = assetsByChunkName[name];
  if (!Array.isArray(assets)) {
    assets = [assets];
  }
  const file = assets.find(asset => /\.js$/.test(asset));

  return file ? <script src={`/dist/${file}`} /> : '';
}

/**
 * Webpack stats for asset retrieval are passes in param because
 * of webpack-hot-server-middleware, not in the res as webpack-dev-middleware tells.
 *
 * @SEE https://github.com/webpack/webpack-dev-middleware#server-side-rendering
 * @SEE https://github.com/60frames/webpack-hot-server-middleware
 */
export default function serverRenderer({ clientStats }) {
  const { assetsByChunkName } = clientStats;

  return (req, res) => {
    console.log('Request: ', req.originalUrl); // Logs requests to docker output

    const context = {};

    // Init the styled-components stylesheet
    const sheet = new ServerStyleSheet();

    // Configure Redux
    const store = configureStore();

    /**
     * Create client with link to cms container.
     * SERVER_API_HOST points to the linked docker container.
     */
    const apolloClient = createApolloClient(`http://${process.env.SERVER_API_HOST}`, null, req, fetch);

    // Setup the App
    const App = (
      <Provider store={store}>
        <StyleSheetManager sheet={sheet.instance}>
          <ApolloProvider client={apolloClient}>
            <StaticRouter location={req.url} context={context}>
              <Layout />
            </StaticRouter>
          </ApolloProvider>
        </StyleSheetManager>
      </Provider>
    );

    // Render App when all GraphQL data is loaded.
    getDataFromTree(App).then(() => {
      // let's do some rendering now...
      const content = renderToString(App);
      const initialState = apolloClient.extract();

      // Helmet prepares the head
      const helmet = Helmet.renderStatic();
      const htmlAttrs = helmet.htmlAttributes.toComponent();
      const bodyAttrs = helmet.bodyAttributes.toComponent();

      // Pass the API host to the client
      const clientApiHost = JSON.stringify(process.env.CLIENT_API_HOST);

      // Build HTML
      const html = (
        <html {...htmlAttrs}>
          <head>
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            {sheet.getStyleElement()}
          </head>
          <body {...bodyAttrs}>
            <GtagInit />

            <div id="root" dangerouslySetInnerHTML={{ __html: content }} />

            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')};
                  window.CLIENT_API_HOST=${clientApiHost};
                `,
              }}
            />
            {getJsByChunkName('main', assetsByChunkName)}
          </body>
        </html>
      );

      // Render and return HTML
      res.status(200);
      res.send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
      res.end();
    });
  };
}
