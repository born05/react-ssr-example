import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import introspectionQueryResultData from '../constants/fragmentTypes.json';

const config = {
  token: 'GRAPHQL_TOKEN_GOES_HERE',
};

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export default function createApolloClient(uri, initialState = null, req = null, fetch = null) {
  const clientConfig = {
    uri,
    headers: {
      Authorization: `bearer ${config.token}`,
    },
  };

  // Server passes it's own fetch method.
  if (fetch) {
    clientConfig.fetch = fetch;
  }

  // Pass cookies to the API server.
  if (req !== null) {
    clientConfig.headers.cookie = req.header('Cookie');
  }

  // Pass the initial state to let the client continue where the server ended.
  let cache = null;
  if (initialState) {
    cache = new InMemoryCache({ fragmentMatcher }).restore(initialState);
  } else {
    cache = new InMemoryCache({ fragmentMatcher });
  }

  const client = new ApolloClient({
    // Only the server passes the request.
    ssrMode: req !== null,

    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
        }
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      new HttpLink(clientConfig),
    ]),
    cache,
  });

  return client;
}
