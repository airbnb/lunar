import Core from '@airbnb/lunar';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import Mutation from './components/Mutation';
import Query from './components/Query';
import Provider from './components/Provider';

export * from 'apollo-client';

export { onError, HttpLink, Mutation, Query, Provider };

export type Settings = {
  links: ApolloLink[];
};

class Apollo {
  settings: Settings = {
    links: [],
  };

  protected client?: ApolloClient<any>;

  initialize(settings: Partial<Settings> = {}) {
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

    const { links } = this.settings;

    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      connectToDevTools: __DEV__,
      link: ApolloLink.from(links),
      name: Core.settings.name,
      version: '1.0.0',
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
