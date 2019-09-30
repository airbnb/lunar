import React from 'react';
import gql from 'graphql-tag';
import Button from '@airbnb/lunar/lib/components/Button';
import Shimmer from '@airbnb/lunar/lib/components/Shimmer';
import ErrorMessage from '@airbnb/lunar/lib/components/ErrorMessage';
import { MutationFunction } from 'react-apollo';
import { MockedProvider } from '@apollo/react-testing';
import Mutation from '.';

const MUTATION = gql`
  mutation updateUserName($id: ID!, $name: String!) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }
`;

type User = {
  id: number;
  name: string;
};

const variables = { id: 123, name: 'Lunar' };

const mock = {
  request: {
    query: MUTATION,
    variables,
  },
  result: {
    data: {
      updateUser: {
        id: 123,
        name: 'Lunar',
        __typename: 'user',
      },
    },
  },
  delay: 2000,
};

const loadingMock = {
  ...mock,
  delay: 100000,
};

const errorMock = {
  request: {
    query: MUTATION,
    variables,
  },
  error: new Error('404: GraphQL mutation failed!'),
};

function UpdateButton({ onUpdate }: { onUpdate: MutationFunction<{}, User> }) {
  return (
    <Button
      type="button"
      onClick={() => {
        onUpdate({
          variables: {
            id: 123,
            name: 'Lunar',
          },
        });
      }}
    >
      {'Update name to "Lunar"'}
    </Button>
  );
}

export default {
  title: 'Apollo/Mutation',
  parameters: {
    inspectComponents: [Mutation],
  },
};

export function executeAGraphQlMutationAndHandleTheResponseWhenReceived() {
  return (
    <MockedProvider mocks={[mock]} addTypename={false}>
      <Mutation mutation={MUTATION} variables={variables}>
        {updateUser => <UpdateButton onUpdate={updateUser} />}
      </Mutation>
    </MockedProvider>
  );
}

executeAGraphQlMutationAndHandleTheResponseWhenReceived.story = {
  name: 'Execute a GraphQL mutation and handle the response when received.',
};

export function customLoadingComponent() {
  return (
    <MockedProvider mocks={[loadingMock]} addTypename={false}>
      <Mutation mutation={MUTATION} variables={variables} loading={<Shimmer />}>
        {updateUser => <UpdateButton onUpdate={updateUser} />}
      </Mutation>
    </MockedProvider>
  );
}

customLoadingComponent.story = {
  name: 'Custom loading component.',
};

export function customErrorComponent() {
  return (
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <Mutation mutation={MUTATION} error={error => <ErrorMessage error={error} />}>
        {updateUser => <UpdateButton onUpdate={updateUser} />}
      </Mutation>
    </MockedProvider>
  );
}

customErrorComponent.story = {
  name: 'Custom error component.',
};
