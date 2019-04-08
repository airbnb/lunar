import React from 'react';
import { storiesOf } from '@storybook/react';
import gql from 'graphql-tag';
import Button from '@airbnb/lunar/lib/components/Button';
import Shimmer from '@airbnb/lunar/lib/components/Shimmer';
import ErrorMessage from '@airbnb/lunar/lib/components/ErrorMessage';
import { MockedProvider } from 'react-apollo/test-utils';
import Mutation from './Mutation';

const MUTATION = gql`
  mutation updateUserName($id: ID!, $name: String!) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }
`;

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

function UpdateButton({ onUpdate }: any) {
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

storiesOf('Apollo/Mutation', module)
  .add('Execute a GraphQL mutation and handle the response when received.', () => (
    <MockedProvider mocks={[mock]} addTypename={false}>
      <Mutation mutation={MUTATION} variables={variables}>
        {updateUser => <UpdateButton onUpdate={updateUser} />}
      </Mutation>
    </MockedProvider>
  ))
  .add('Custom loading component.', () => (
    <MockedProvider mocks={[loadingMock]} addTypename={false}>
      <Mutation mutation={MUTATION} variables={variables} loading={<Shimmer />}>
        {updateUser => <UpdateButton onUpdate={updateUser} />}
      </Mutation>
    </MockedProvider>
  ))
  .add('Custom error component.', () => (
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <Mutation mutation={MUTATION} error={error => <ErrorMessage error={error} />}>
        {updateUser => <UpdateButton onUpdate={updateUser} />}
      </Mutation>
    </MockedProvider>
  ));
