import React from 'react';
import {
  Mutation as BaseMutation,
  MutationProps,
  MutationResult,
  MutationFn,
  OperationVariables,
} from 'react-apollo';
import { ApolloError } from 'apollo-client';
import { Omit } from 'utility-types';
import ErrorMessage from '@airbnb/lunar/lib/components/ErrorMessage';
import Loader from '@airbnb/lunar/lib/components/Loader';
import renderElementOrFunction, {
  RenderableProp,
} from '@airbnb/lunar/lib/utils/renderElementOrFunction';

export * from 'react-apollo/Mutation';

export type Props<Data, Vars> = Omit<MutationProps<Data, Vars>, 'client'> & {
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
};

/**
 * A declarative component to make GraphQL mutations.
 * Based on Apollo's [Mutation](https://www.apollographql.com/docs/react/essentials/mutations.html#props) component.
 */
export default class Mutation<Data = any, Vars = OperationVariables> extends React.Component<
  Props<Data, Vars>
> {
  static defaultProps = {
    awaitRefetchQueries: false,
    ignoreResults: false,
    variables: {},
  };

  private handleRender = (mutator: MutationFn<Data, Vars>, result: MutationResult<Data>) => {
    if (result.loading) {
      return renderElementOrFunction(this.props.loading) || <Loader static />;
    }

    if (result.error) {
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

    return <BaseMutation<Data, Vars> {...props as any}>{this.handleRender}</BaseMutation>;
  }
}
