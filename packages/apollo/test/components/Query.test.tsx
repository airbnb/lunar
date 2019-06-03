import React from 'react';
import renderer from 'react-test-renderer';
import gql from 'graphql-tag';
import Loader from '@airbnb/lunar/lib/components/Loader';
import ErrorMessage from '@airbnb/lunar/lib/components/ErrorMessage';
import { MockedProvider } from 'react-apollo/test-utils';
import Query from '../../src/components/Query';

const QUERY = gql`
  query getSomething {
    something {
      id
      name
    }
  }
`;

// Enzyme doesn't support new Context, so we must do this manually.
// https://www.apollographql.com/docs/react/recipes/testing.html

function wait() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

describe('Query', () => {
  describe('loading', () => {
    it('renders a `Loader` by default', () => {
      const wrapper = renderer.create(
        <MockedProvider mocks={[]} addTypename={false}>
          <Query query={QUERY}>{() => null}</Query>
        </MockedProvider>,
      );

      expect(wrapper.root.findByType(Loader)).toBeDefined();
    });

    it('can pass a custom loading element with `loading` prop', () => {
      const loader = <div>Loading!</div>;
      const wrapper = renderer.create(
        <MockedProvider mocks={[]} addTypename={false}>
          <Query query={QUERY} loading={loader}>
            {() => null}
          </Query>
        </MockedProvider>,
      );

      expect(wrapper.root.findByType('div').children).toEqual(['Loading!']);
    });
  });

  describe('error', () => {
    const mock = {
      request: {
        query: QUERY,
        variables: {},
      },
      result: {
        errors: [
          {
            message: 'Error!',
            locations: undefined,
            path: undefined,
            nodes: undefined,
            source: undefined,
            positions: undefined,
            originalError: undefined,
            extensions: undefined,
            name: '',
          },
        ],
        data: {
          something: {
            id: 123,
            name: 'Something',
          },
        },
      },
    };

    it('renders an `ErrorMessage` by default', async () => {
      const wrapper = renderer.create(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <Query query={QUERY}>{() => null}</Query>
        </MockedProvider>,
      );

      await wait();

      const error = wrapper.root.findByType(ErrorMessage);

      expect(error).toBeDefined();
      expect(error.props).toEqual(
        expect.objectContaining({
          error: new Error('GraphQL error: Error!'),
        }),
      );
    });

    it('can pass a custom error element with `error` prop', async () => {
      const error = <div>Failed!</div>;
      const wrapper = renderer.create(
        <MockedProvider mocks={[]} addTypename={false}>
          <Query query={QUERY} error={error}>
            {() => null}
          </Query>
        </MockedProvider>,
      );

      await wait();

      expect(wrapper.root.findByType('div').children).toEqual(['Failed!']);
    });

    it('will ignore graphQLErrors via `ignoreGraphQLErrors` prop', async () => {
      const spy = jest.fn(() => null);

      renderer.create(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <Query query={QUERY} ignoreGraphQLErrors>
            {spy}
          </Query>
        </MockedProvider>,
      );

      await wait();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('result', () => {
    it('triggers child function', async () => {
      const mock = {
        request: {
          query: QUERY,
          variables: {},
        },
        result: {
          data: {
            something: {
              id: 123,
              name: 'Something',
            },
          },
        },
      };

      const spy = jest.fn(() => null);

      renderer.create(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <Query query={QUERY}>{spy}</Query>
        </MockedProvider>,
      );

      await wait();

      expect(spy).toHaveBeenCalled();
    });

    it('renders the child function with the result', async () => {
      const mock = {
        request: {
          query: QUERY,
          variables: {},
        },
        result: {
          data: {
            something: {
              id: 123,
              name: 'Something',
            },
          },
        },
      };

      await wait();

      renderer.create(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <Query query={QUERY}>
            {(data, result) => {
              expect(data).toEqual(mock.result.data);
              expect(result).toEqual(expect.objectContaining(mock.result));

              return null;
            }}
          </Query>
        </MockedProvider>,
      );
    });

    it('passes null when no data available', async () => {
      const mock = {
        request: {
          query: QUERY,
          variables: {},
        },
        result: {},
      };

      renderer.create(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <Query query={QUERY}>
            {data => {
              expect(data).toBeNull();

              return null;
            }}
          </Query>
        </MockedProvider>,
      );

      await wait();
    });
  });
});
