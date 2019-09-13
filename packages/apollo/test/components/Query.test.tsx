import React from 'react';
import { mount } from 'enzyme';
import gql from 'graphql-tag';
import { WrappingComponent } from '@airbnb/lunar-test-utils';
import Loader from '@airbnb/lunar/lib/components/Loader';
import ErrorMessage from '@airbnb/lunar/lib/components/ErrorMessage';
import { MockedProvider, MockedResponse, wait } from '@apollo/react-testing';
import Query from '../../src/components/Query';

const QUERY = gql`
  query getSomething {
    something {
      id
      name
    }
  }
`;

function ApolloComponent({
  children,
  mocks,
}: {
  children: NonNullable<React.ReactNode>;
  mocks: MockedResponse[];
}) {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <WrappingComponent>{children}</WrappingComponent>
    </MockedProvider>
  );
}

describe('Query', () => {
  describe('loading', () => {
    it('renders a `Loader` by default', () => {
      const wrapper = mount(<Query query={QUERY}>{() => null}</Query>, {
        wrappingComponent: ApolloComponent,
        wrappingComponentProps: { mocks: [] },
      });

      expect(wrapper.find(Loader)).toHaveLength(1);
    });

    it('can pass a custom loading element with `loading` prop', () => {
      const loader = <div>Loading!</div>;
      const wrapper = mount(
        <Query query={QUERY} loading={loader}>
          {() => null}
        </Query>,
        {
          wrappingComponent: ApolloComponent,
          wrappingComponentProps: { mocks: [] },
        },
      );

      expect(wrapper.find(Query).contains(loader)).toBe(true);
    });
  });

  // Requires hook/act support
  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('error', () => {
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

    it('renders an `ErrorMessage` by default', () => {
      const wrapper = mount(<Query query={QUERY}>{() => null}</Query>, {
        wrappingComponent: ApolloComponent,
        wrappingComponentProps: { mocks: [mock] },
      });

      const error = wrapper.find(ErrorMessage);

      expect(error).toBeDefined();
      expect(error.props()).toEqual(
        expect.objectContaining({
          error: new Error('GraphQL error: Error!'),
        }),
      );
    });

    it('can pass a custom error element with `error` prop', async () => {
      const error = <div>Failed!</div>;
      const wrapper = mount(
        <Query query={QUERY} error={error}>
          {() => null}
        </Query>,
        {
          wrappingComponent: ApolloComponent,
          wrappingComponentProps: { mocks: [mock] },
        },
      );

      await wait(0);

      expect(wrapper.find(Query).contains(error)).toBe(true);
    });

    it('will ignore graphQLErrors via `ignoreGraphQLErrors` prop', async () => {
      const spy = jest.fn(() => null);

      mount(
        <Query ignoreGraphQLErrors query={QUERY}>
          {spy}
        </Query>,
        {
          wrappingComponent: ApolloComponent,
          wrappingComponentProps: { mocks: [mock] },
        },
      );

      await wait(0);

      expect(spy).toHaveBeenCalled();
    });
  });

  // Requires hook/act support
  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('result', () => {
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

      mount(<Query query={QUERY}>{spy}</Query>, {
        wrappingComponent: ApolloComponent,
        wrappingComponentProps: { mocks: [mock] },
      });

      await wait(0);

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

      expect.assertions(2);

      mount(
        <Query query={QUERY}>
          {(data, result) => {
            expect(data).toEqual(mock.result.data);
            expect(result).toEqual(expect.objectContaining(mock.result));

            return null;
          }}
        </Query>,
        {
          wrappingComponent: ApolloComponent,
          wrappingComponentProps: { mocks: [mock] },
        },
      );

      await wait(0);
    });

    it('passes null when no data available', async () => {
      const mock = {
        request: {
          query: QUERY,
          variables: {},
        },
        result: {},
      };

      expect.assertions(1);

      mount(
        <Query query={QUERY}>
          {data => {
            expect(data).toBeNull();

            return null;
          }}
        </Query>,
        {
          wrappingComponent: ApolloComponent,
          wrappingComponentProps: { mocks: [mock] },
        },
      );

      await wait(0);
    });
  });
});
