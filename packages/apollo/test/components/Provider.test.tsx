import React from 'react';
import { shallowWithStyles, WrappingComponent } from '@airbnb/lunar-test-utils';
import { ApolloProvider } from 'react-apollo';
import Apollo from '../../src';
import Provider from '../../src/components/Provider';

describe('Provider', () => {
  beforeEach(() => {
    Apollo.initialize();
  });

  it('renders an `ApolloProvider`', () => {
    const wrapper = shallowWithStyles(
      <WrappingComponent>
        <Provider>Foo</Provider>
      </WrappingComponent>,
      true,
    );

    expect(wrapper.find(ApolloProvider)).toHaveLength(1);
  });
});
