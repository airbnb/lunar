import React from 'react';
import { mountWithStyles, WrappingComponent } from '@airbnb/lunar-test-utils';
import { ApolloProvider } from 'react-apollo';
import Apollo from '../../src';
import Provider from '../../src/components/Provider';

describe('Provider', () => {
  beforeEach(() => {
    Apollo.initialize();
  });

  it('renders an `ApolloProvider`', () => {
    const wrapper = mountWithStyles(
      <WrappingComponent>
        <Provider>Foo</Provider>
      </WrappingComponent>,
    );

    expect(wrapper.find(ApolloProvider)).toHaveLength(1);
  });
});
