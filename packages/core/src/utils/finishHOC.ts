/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

export default function finishHOC<
  T extends React.ComponentType<any>,
  W extends React.ComponentType<any>
>(name: string, WrapperComponent: T, WrappedComponent: W) {
  // istanbul ignore next
  const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  WrapperComponent.displayName = `${name}(${wrappedName})`;

  // @ts-ignore
  WrapperComponent.WrappedComponent = WrappedComponent;

  hoistNonReactStatics(WrapperComponent, WrappedComponent);

  return WrapperComponent;
}
