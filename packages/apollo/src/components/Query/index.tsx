import React from 'react';
import {
  Query as BaseQuery,
  QueryComponentOptions,
  QueryResult,
  OperationVariables,
} from 'react-apollo';
import { ApolloError } from 'apollo-client';
import ErrorMessage from '@airbnb/lunar/lib/components/ErrorMessage';
import Loader from '@airbnb/lunar/lib/components/Loader';
import renderElementOrFunction, {
  RenderableProp,
} from '@airbnb/lunar/lib/utils/renderElementOrFunction';

export type QueryProps<Data, Vars> = Omit<
  QueryComponentOptions<Data, Vars>,
  'children' | 'client'
> & {
  /** Child function to render when the data has been received. */
  children: (data: Data | null, result: QueryResult<Data, Vars>) => React.ReactNode;
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
 * A declarative component to make GraphQL queries.
 * Based on Apollo's [Query](https://www.apollographql.com/docs/react/essentials/queries.html#props) component.
 */
export default class Query<Data = {}, Vars = OperationVariables> extends React.Component<
  QueryProps<Data, Vars>
> {
  static defaultProps = {
    ignoreGraphQLErrors: false,
    notifyOnNetworkStatusChange: false,
    partialRefetch: false,
    pollInterval: 0,
    skip: false,
    ssr: false,
    variables: {},
  };

  private handleRender = (result: QueryResult<Data, Vars>) => {
    if (result.loading) {
      return renderElementOrFunction(this.props.loading) || <Loader static />;
    }

    if (result.error && (!this.props.ignoreGraphQLErrors || result.error.networkError)) {
      return (
        renderElementOrFunction(this.props.error, result.error) || (
          <ErrorMessage error={result.error} />
        )
      );
    }

    return this.props.children(result.data || null, result);
  };

  render() {
    const { children, loading, error, ...props } = this.props;

    // @ts-ignore Prop spreading
    return <BaseQuery<Data, Vars> {...props}>{this.handleRender}</BaseQuery>;
  }
}
