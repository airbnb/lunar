/* eslint-env jest */

import React from 'react';
import FormContext from '../src/components/FormContext';
import { Context } from '../src/types';

// istanbul ignore next
export function createFormContext(): Context & { unregister: () => void } {
  const unregister = jest.fn();

  return {
    change: jest.fn(),
    getFields: () => [],
    getState: () => ({} as any),
    register: jest.fn(() => unregister),
    submit: jest.fn(() => Promise.resolve({})),
    unregister,
  };
}

export function WrappingFormComponent({
  children,
  context,
}: {
  children: React.ReactNode;
  context: Context;
}) {
  return <FormContext.Provider value={context}>{children}</FormContext.Provider>;
}
