import React from 'react';
import { ApolloProvider } from 'react-apollo';
import Apollo from '../..';

export type ProviderProps = {
  /** Application to render. */
  children: NonNullable<React.ReactNode>;
};

/**
 * Context based component that provides Apollo's client to all Query and Mutation components.
 * Must be rendered at the root of an application.
 */
export default function Provider({ children }: ProviderProps) {
  return <ApolloProvider client={Apollo.getClient()}>{children}</ApolloProvider>;
}
