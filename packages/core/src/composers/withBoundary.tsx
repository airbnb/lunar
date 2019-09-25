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

    return finishHOC('withBoundary', WithBoundary, WrappedComponent);
  };
}
