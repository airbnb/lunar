import React from 'react';
import { gql, MutationResult, MutationFunction } from '@apollo/client';
import { mount } from 'enzyme';
import { WrappingComponent } from '@airbnb/lunar-test-utils';
import Loader from '@airbnb/lunar/lib/components/Loader';
import ErrorMessage from '@airbnb/lunar/lib/components/ErrorMessage';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import Mutation from '../../src/components/Mutation';
import { wait } from '../utils';

const MUTATION = gql`
  mutation updateSomething($id: Int!, $name: String!) {
    updateSomething(id: $id, name: $name) {
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

type Variables = {
  id: number;
  name: string;
};

describe('Mutation', () => {
  const childHandler = (mutate: MutationFunction<unknown, Variables>) => (
    <button type="button" onClick={() => mutate({ variables: { id: 123, name: 'Something' } })}>
      Submit
    </button>
  );

  describe('loading', () => {
    const mock = {
      request: {
        query: MUTATION,
        variables: { id: 123, name: 'Something' },
      },
      result: {
        data: {
          updateSomething: {
            id: 123,
            name: 'Something',
            __typename: 'something',
          },
        },
      },
    };

    it('renders a `Loader` by default', () => {
      const wrapper = mount(<Mutation mutation={MUTATION}>{childHandler}</Mutation>, {
        wrappingComponent: ApolloComponent,
        wrappingComponentProps: { mocks: [mock] },
      });

      wrapper.find('button').simulate('click');

      expect(wrapper.find(Loader)).toHaveLength(1);
    });

    it('can pass a custom loading element with `loading` prop', () => {
      const loader = <div>Loading!</div>;
      const wrapper = mount(
        <Mutation mutation={MUTATION} loading={loader}>
          {childHandler}
        </Mutation>,
        {
          wrappingComponent: ApolloComponent,
          wrappingComponentProps: { mocks: [mock] },
        },
      );

      wrapper.find('button').simulate('click');

      expect(wrapper.find(Mutation).contains(loader)).toBe(true);
    });
  });

  // Requires hook/act support
  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('error', () => {
    const mock = {
      request: {
        query: MUTATION,
        variables: { id: 123, name: 'Something' },
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
          updateSomething: {
            id: 123,
            name: 'Something',
            __typename: 'something',
          },
        },
      },
    };

    it('renders an `ErrorMessage` by default', async () => {
      try {
        const wrapper = mount(
          <Mutation mutation={MUTATION} variables={mock.request.variables}>
            {childHandler}
          </Mutation>,
          {
            wrappingComponent: ApolloComponent,
            wrappingComponentProps: { mocks: [mock] },
          },
        );

        wrapper.find('button').simulate('click');

        await wait(0);

        const error = wrapper.find(ErrorMessage);

        expect(error).toBeDefined();
        expect(error.props()).toEqual(
          expect.objectContaining({
            error: new Error('Network error: 404'),
          }),
        );
      } catch (error) {
        // Ignore
      }
    });

    it('can pass a custom error element with `error` prop', async () => {
      try {
        const error = <div>Failed!</div>;
        const wrapper = mount(
          <Mutation mutation={MUTATION} error={error} variables={mock.request.variables}>
            {childHandler}
          </Mutation>,
          {
            wrappingComponent: ApolloComponent,
            wrappingComponentProps: { mocks: [mock] },
          },
        );

        wrapper.find('button').simulate('click');

        await wait(0);

        expect(wrapper.find(Mutation).contains(error)).toBe(true);
      } catch (error) {
        // Ignore
      }
    });

    it('will ignore an error with the `ignoreGraphQLErrors` prop', () => {
      const spy = jest.fn(() => null);

      mount(
        <Mutation ignoreGraphQLErrors mutation={MUTATION}>
          {spy}
        </Mutation>,
        {
          wrappingComponent: ApolloComponent,
          wrappingComponentProps: { mocks: [mock] },
        },
      );

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('result', () => {
    const mock = {
      request: {
        query: MUTATION,
        variables: { id: 123 },
      },
      result: {},
    };

    it('triggers child function', () => {
      const spy = jest.fn(() => null);

      mount(<Mutation mutation={MUTATION}>{spy}</Mutation>, {
        wrappingComponent: ApolloComponent,
        wrappingComponentProps: { mocks: [mock] },
      });

      expect(spy).toHaveBeenCalled();
    });

    it('passes mutator and result to child function', () => {
      mount(
        <Mutation mutation={MUTATION}>
          {(mutator: MutationFunction, result: MutationResult) => {
            expect(typeof mutator).toBe('function');
            expect(result).toEqual(
              expect.objectContaining({
                called: false,
                loading: false,
              }),
            );

            return null;
          }}
        </Mutation>,
        {
          wrappingComponent: ApolloComponent,
          wrappingComponentProps: { mocks: [mock] },
        },
      );
    });
  });
});
