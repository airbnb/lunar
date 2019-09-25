import React from 'react';

export type RenderableProp<T = unknown> =
  | React.ReactElement
  | ((value: T) => React.ReactElement | null)
  | undefined
  | null;

function renderElementOrFunction<T = unknown>(
  prop: RenderableProp<T>,
  value?: T,
): React.ReactElement | null {
  if (!prop) {
    return null;
  }

  const element = typeof prop === 'function' ? prop(value as T) : prop;

  if (React.isValidElement(element)) {
    return element;
  }

  return null;
}

export default renderElementOrFunction;
