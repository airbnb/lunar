import Core from '@airbnb/lunar';
import { ApolloClient, ApolloClientOptions } from 'apollo-client';
import { InMemoryCache, InMemoryCacheConfig } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import Mutation from './components/Mutation';
import Query from './components/Query';
import Provider from './components/Provider';
// @ts-ignore
import pkg from '../package.json';

export * from 'apollo-client';
export * from 'apollo-cache-inmemory';

export { onError, HttpLink, Mutation, Query, Provider };

export type Settings = {
  links?: ApolloLink[];
  resolvers?: ApolloClientOptions<null>['resolvers'];
  typeDefs?: ApolloClientOptions<null>['typeDefs'];
  cacheConfig?: InMemoryCacheConfig;
};

class Apollo {
  settings: Required<Settings> = {
    links: [],
    resolvers: {},
    typeDefs: '',
    cacheConfig: {},
  };

  protected client?: ApolloClient<{}>;

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

    const { links, resolvers, typeDefs, cacheConfig } = this.settings;

    this.client = new ApolloClient({
      cache: new InMemoryCache(cacheConfig),
      connectToDevTools: __DEV__,
      link: ApolloLink.from(links),
      name: Core.settings.name,
      resolvers,
      typeDefs,
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
