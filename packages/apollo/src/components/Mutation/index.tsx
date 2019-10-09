import React from 'react';
import {
  Mutation as BaseMutation,
  MutationComponentOptions,
  MutationResult,
  MutationFunction,
  OperationVariables,
} from 'react-apollo';
import { ApolloError } from 'apollo-client';
import ErrorMessage from '@airbnb/lunar/lib/components/ErrorMessage';
import Loader from '@airbnb/lunar/lib/components/Loader';
import renderElementOrFunction, {
  RenderableProp,
} from '@airbnb/lunar/lib/utils/renderElementOrFunction';

export type Props<Data, Vars> = Omit<MutationComponentOptions<Data, Vars>, 'client'> & {
  /**
   * Render an element or a function that returns an element when an error occurs.
   * The function is passed the `ApolloError` as an argument.
   * When not defined, this defaults to `ErrorMessage`.
   */
  error?: RenderableProp<ApolloError>;
  /**
   * Render an element or a function that returns an element while loading.
   * When not defined, this defaults to `Loader`.
   */
  loading?: RenderableProp;
  /**
   * Allow graphql errors to be passed to the render function.  If this is true the render function
   * may receive partial data and is expected to be able to handle `result.error.graphQLErrors`
   */
  ignoreGraphQLErrors?: boolean;
};

/**
 * A declarative component to make GraphQL mutations.
 * Based on Apollo's [Mutation](https://www.apollographql.com/docs/react/essentials/mutations.html#props) component.
 */
export default class Mutation<Data = {}, Vars = OperationVariables> extends React.Component<
  Props<Data, Vars>
> {
  static defaultProps = {
    awaitRefetchQueries: false,
    ignoreGraphQLErrors: false,
    ignoreResults: false,
    variables: {},
  };

  private handleRender = (mutator: MutationFunction<Data, Vars>, result: MutationResult<Data>) => {
    if (result.loading) {
      return renderElementOrFunction(this.props.loading) || <Loader static />;
    }

    if (result.error && (!this.props.ignoreGraphQLErrors || result.error.networkError)) {
      // istanbul ignore next (need to fix tests)
      return (
        renderElementOrFunction(this.props.error, result.error) || (
          <ErrorMessage error={result.error} />
        )
      );
    }

    return this.props.children(mutator, result);
  };

  render() {
    const { children, loading, error, ...props } = this.props;

    // @ts-ignore Prop spreading
    return <BaseMutation<Data, Vars> {...props}>{this.handleRender}</BaseMutation>;
  }
}
