import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as BaseApolloProvider,
} from '@apollo/client';
import React from 'react';

const client = new ApolloClient({
  uri: '/api/graphql/shopify',
  cache: new InMemoryCache(),
});

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}
