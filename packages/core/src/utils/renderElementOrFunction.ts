import React from 'react';

export type RenderableProp<T = any> =
  | React.ReactElement<any>
  | ((value: T) => React.ReactElement<any> | null)
  | undefined
  | null;

function renderElementOrFunction<T = any>(
  prop: RenderableProp<T>,
  value?: T,
): React.ReactElement<any> | null {
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
