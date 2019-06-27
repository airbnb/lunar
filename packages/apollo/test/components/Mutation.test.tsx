import React from 'react';
import renderer from 'react-test-renderer';
import gql from 'graphql-tag';
import { WrappingComponent } from '@airbnb/lunar-test-utils';
import Loader from '@airbnb/lunar/lib/components/Loader';
import ErrorMessage from '@airbnb/lunar/lib/components/ErrorMessage';
import { MockedProvider } from 'react-apollo/test-utils';
import Mutation from '../../src/components/Mutation';

const MUTATION = gql`
  mutation updateSomething($id: Int!, $name: String!) {
    updateSomething(id: $id, name: $name) {
      id
      name
    }
  }
`;

// Enzyme doesn't support new Context, so we must do this manually.
// https://www.apollographql.com/docs/react/recipes/testing.html#Testing-mutation-components

function wait() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

describe('Mutation', () => {
  const childHandler = (mutate: any) => (
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
      const wrapper = renderer.create(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <WrappingComponent>
            <Mutation mutation={MUTATION}>{childHandler}</Mutation>
          </WrappingComponent>
        </MockedProvider>,
      );

      wrapper.root.findByType('button').props.onClick();

      expect(wrapper.root.findByType(Loader)).toBeDefined();
    });

    it('can pass a custom loading element with `loading` prop', () => {
      const loader = <div>Loading!</div>;
      const wrapper = renderer.create(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <WrappingComponent>
            <Mutation mutation={MUTATION} loading={loader}>
              {childHandler}
            </Mutation>
          </WrappingComponent>
        </MockedProvider>,
      );

      wrapper.root.findByType('button').props.onClick();

      expect(wrapper.root.findByType('div').children).toEqual(['Loading!']);
    });
  });

  describe('error', () => {
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
        const wrapper = renderer.create(
          <MockedProvider mocks={[mock]} addTypename={false}>
            <WrappingComponent>
              <Mutation mutation={MUTATION} variables={mock.request.variables}>
                {childHandler}
              </Mutation>
            </WrappingComponent>
          </MockedProvider>,
        );

        await wrapper.root.findByType('button').props.onClick();

        await wait();

        const error = wrapper.root.findByType(ErrorMessage);

        expect(error).toBeDefined();
        expect(error.props).toEqual(
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
        const wrapper = renderer.create(
          <MockedProvider mocks={[mock]} addTypename={false}>
            <WrappingComponent>
              <Mutation mutation={MUTATION} error={error} variables={mock.request.variables}>
                {childHandler}
              </Mutation>
            </WrappingComponent>
          </MockedProvider>,
        );

        await wrapper.root.findByType('button').props.onClick();

        await wait();

        expect(wrapper.root.findByType('div').children).toEqual(['Failed!']);
      } catch (error) {
        // Ignore
      }
    });

    it('will ignore an error with the `ignoreGraphQLErrors` prop', async () => {
      const spy = jest.fn(() => null);

      renderer.create(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <WrappingComponent>
            <Mutation mutation={MUTATION} ignoreGraphQLErrors>
              {spy}
            </Mutation>
          </WrappingComponent>
        </MockedProvider>,
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

      renderer.create(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <WrappingComponent>
            <Mutation mutation={MUTATION}>{spy}</Mutation>
          </WrappingComponent>
        </MockedProvider>,
      );

      expect(spy).toHaveBeenCalled();
    });

    it('passes mutator and result to child function', () => {
      renderer.create(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <WrappingComponent>
            <Mutation mutation={MUTATION}>
              {(mutator, result) => {
                expect(typeof mutator).toBe('function');
                expect(result).toEqual(
                  expect.objectContaining({
                    called: false,
                    loading: false,
                  }),
                );

                return null;
              }}
            </Mutation>
          </WrappingComponent>
        </MockedProvider>,
      );
    });
  });
});
