import React from 'react';
import Shimmer from '@airbnb/lunar/lib/components/Shimmer';
import ErrorMessage from '@airbnb/lunar/lib/components/ErrorMessage';
import { MockedProvider } from '@apollo/react-testing';
import gql from 'graphql-tag';
import Query from '.';

const QUERY = gql`
  query getUserByID($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;

type User = {
  id: number;
  name: string;
};

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

export default {
  title: 'Apollo/Query',
  parameters: {
    inspectComponents: [Query],
  },
};

export function executeAGraphQlQueryAndRenderTheResponseWhenReceived() {
  return (
    <MockedProvider mocks={[mock]} addTypename={false}>
      <Query<{ user: User }> query={QUERY} variables={{ id: 123 }}>
        {data => data && <div>Loaded user: {data.user.name}</div>}
      </Query>
    </MockedProvider>
  );
}

executeAGraphQlQueryAndRenderTheResponseWhenReceived.story = {
  name: 'Execute a GraphQL query and render the response when received.',
};

export function customLoadingComponent() {
  return (
    <MockedProvider mocks={[loadingMock]} addTypename={false}>
      <Query query={QUERY} variables={{ id: 123 }} loading={<Shimmer />}>
        {() => null}
      </Query>
    </MockedProvider>
  );
}

customLoadingComponent.story = {
  name: 'Custom loading component.',
};

export function customErrorComponent() {
  return (
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <Query query={QUERY} error={error => <ErrorMessage error={error} />}>
        {() => null}
      </Query>
    </MockedProvider>
  );
}

customErrorComponent.story = {
  name: 'Custom error component.',
};
