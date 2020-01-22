/* eslint-disable react/jsx-handler-names */

import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import TrackingBoundary from '../components/TrackingBoundary';
import finishHOC from '../utils/finishHOC';
import Core from '..';

export type WithBoundaryWrapperProps = {
  trackingName?: string;
};

export default function withBoundary(name?: string) /* infer */ {
  return function withBoundaryFactory<Props extends object = {}>(
    WrappedComponent: React.ComponentType<Props>,
  ): React.ComponentType<Props & WithBoundaryWrapperProps> {
    function WithBoundary({ trackingName, ...restProps }: Props & WithBoundaryWrapperProps) {
      return (
        <TrackingBoundary name={trackingName || name}>
          <ErrorBoundary name={trackingName || name} onCatch={Core.log}>
            <WrappedComponent {...(restProps as Props)} />
          </ErrorBoundary>
        </TrackingBoundary>
      );
    }

    const result = finishHOC('withBoundary', WithBoundary, WrappedComponent);

    // TEMP, fix hoist upstream
    // https://github.com/mridgway/hoist-non-react-statics/pull/93
    // @ts-ignore
    delete result.$$typeof;

    return result;
  };
}
