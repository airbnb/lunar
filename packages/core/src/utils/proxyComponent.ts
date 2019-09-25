/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

export default function proxyComponent<T>(
  Component: React.ComponentType<T>,
  implementation: (props: any) => React.ReactElement<T>,
): React.ComponentType<T> {
  function Proxy(props: T) {
    return implementation(props);
  }

  Proxy.displayName = `Proxy(${Component.displayName || Component.name})`;

  return Proxy;
}
