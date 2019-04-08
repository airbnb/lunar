import React from 'react';
import { storiesOf } from '@storybook/react';
import Shimmer from '@airbnb/lunar/lib/components/Shimmer';
import ErrorMessage from '@airbnb/lunar/lib/components/ErrorMessage';
import { MockedProvider } from 'react-apollo/test-utils';
import gql from 'graphql-tag';
import Query from './Query';

const QUERY = gql`
  query getUserByID($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;

const mock = {
  request: {
    query: QUERY,
    variables: {
      id: 123,
    },
  },
  result: {
    data: {
      user: {
        id: 123,
        name: 'Bruce Wayne',
      },
    },
  },
};

const loadingMock = {
  ...mock,
  delay: 100000,
};

const errorMock = {
  request: {
    query: QUERY,
    variables: {},
  },
  error: new Error('404: GraphQL request has failed!'),
};

storiesOf('Apollo/Query', module)
  .add('Execute a GraphQL query and render the response when received.', () => (
    <MockedProvider mocks={[mock]} addTypename={false}>
      <Query query={QUERY} variables={{ id: 123 }}>
        {({ user }) => <div>Loaded user: {user.name}</div>}
      </Query>
    </MockedProvider>
  ))
  .add('Custom loading component.', () => (
    <MockedProvider mocks={[loadingMock]} addTypename={false}>
      <Query query={QUERY} variables={{ id: 123 }} loading={<Shimmer />}>
        {() => null}
      </Query>
    </MockedProvider>
  ))
  .add('Custom error component.', () => (
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <Query query={QUERY} error={error => <ErrorMessage error={error} />}>
        {() => null}
      </Query>
    </MockedProvider>
  ));
