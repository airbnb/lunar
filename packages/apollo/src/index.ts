import Core from '@airbnb/lunar';
import { ApolloClient, Resolvers } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import Mutation from './components/Mutation';
import Query from './components/Query';
import Provider from './components/Provider';
// @ts-ignore
import pkg from '../package.json';

export * from 'apollo-client';

export { onError, HttpLink, Mutation, Query, Provider };

export type Settings = {
  links?: ApolloLink[];
  resolvers?: Resolvers;
};

class Apollo {
  settings: Required<Settings> = {
    links: [],
    resolvers: {},
  };

  protected client?: ApolloClient<any>;

  initialize(settings?: Settings) {
    this.settings = {
      ...this.settings,
      ...settings,
    };

    this.bootstrapClient();
  }

  bootstrapClient() {
    if (this.client) {
      return;
    }

    const { links, resolvers } = this.settings;

    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      connectToDevTools: __DEV__,
      link: ApolloLink.from(links),
      name: Core.settings.name,
      resolvers,
      version: pkg.version,
    });

    if (__DEV__) {
      // eslint-disable-next-line no-underscore-dangle
      window.__APOLLO_CLIENT__ = this.client;
    }
  }

  getClient() {
    if (__DEV__) {
      if (!this.client) {
        throw new Error(
          'Apollo has not been initialized. Please call `Apollo.initialize()` from `@airbnb/lunar-apollo`.',
        );
      }
    }

    return this.client!;
  }
}

export default new Apollo();
