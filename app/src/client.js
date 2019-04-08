import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import Layout from './shared/Layout';
import createApolloClient from './shared/service/graphql';
import configureStore from './shared/state/configureStore';

// Configure Redux
const store = configureStore();

/**
 * Create client with link to cms container.
 * CLIENT_API_HOST to pass the domain when starting the docker container instead of build.
 */
const apolloClient = createApolloClient(`${window.CLIENT_API_HOST}`, window.__APOLLO_STATE__);

const appEl = document.getElementById('root');

const renderApp = Component => (
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);

hydrate(renderApp(Layout), appEl);
