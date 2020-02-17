/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

export default function proxyComponent<T>(
  Component: React.ComponentType<any>,
  implementation: (props: T) => React.ReactElement<any>,
): React.ComponentType<T> {
  function Proxy(props: T) {
    return implementation(props);
  }

  Proxy.displayName = `Proxy(${Component.displayName || Component.name})`;

  return Proxy;
}
