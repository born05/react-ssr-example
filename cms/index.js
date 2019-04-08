const { ApolloServer, gql } = require('apollo-server');
const { filter, find } = require('lodash');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const pages = [
  {
    slug: '',
    title: 'Home',
    body: 'Welcome the the homepage.',
  },
  {
    slug: 'example',
    title: 'Example page',
    body: 'This is our example page.',
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Page" type can be used in other type declarations.
  type Page {
    slug: String
    title: String
    body: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    page(slug: String): Page
    pages(slug: String): [Page]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema. We'll retrieve page from the "pages" array above.
const resolvers = {
  Query: {
    page: (parent, { slug }) => find(pages, { slug: slug }),
    pages(parent, { slug }) {
      if (typeof slug === 'String') {
        return filter(pages, { slug: slug });
      }

      return pages;
    },
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
