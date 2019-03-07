import React from 'react';
import { shallow } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import Apollo from '../../src';
import Provider from '../../src/components/Provider';

describe('Provider', () => {
  beforeEach(() => {
    Apollo.initialize();
  });

  it('renders an `ApolloProvider`', () => {
    const wrapper = shallow(<Provider>Foo</Provider>);

    expect(wrapper.find(ApolloProvider)).toHaveLength(1);
  });
});
