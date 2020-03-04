import React from 'react';
import componentName from '../../prop-types/componentName';
import Loadable from '../Loadable';
import { Logger } from '../../types';

export type ErrorBoundaryProps = {
  /** Content to wrap. */
  children: NonNullable<React.ReactNode>;
  /** A unique name to identify this boundary in errors and stack traces. */
  name?: string;
  /** Callback fired when an error is received. */
  onCatch: Logger;
};

export type ErrorBoundaryState = {
  error: Error | null;
};

/** Wraps a component and catches errors thrown within its React tree. */
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static propTypes = {
    name: componentName,
  };

  static defaultProps = {
    name: 'UnknownBoundary',
  };

  state = {
    error: null,
  };

  componentDidCatch(error: Error, errorInfo: object) {
    this.props.onCatch(error, {
      ...errorInfo,
      name: this.props.name,
      boundary: true,
    });

    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;

    if (!error) {
      return this.props.children;
    }

    // NOTE: This component is generally not hit in production so we'll code split to keep some code
    // out of bundles in the optimistic case.
    return (
      <Loadable
        component={
          /* istanbul ignore next */ () =>
            import(/* webpackChunkName: "error-boundary-tripped" */ './private/Tripped')
        }
      />
    );
  }
}
