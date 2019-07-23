/* eslint-env jest */

import React from 'react';
import FormContext from '../src/components/FormContext';
import { Context } from '../src/types';

export function createFormContext(): Context {
  return {
    change: jest.fn(),
    getFields: () => [],
    getState: () => ({} as any),
    register: jest.fn(),
    submit: jest.fn(() => Promise.resolve({})),
  };
}

export function WrappingFormComponent({
  children,
  context = null,
}: {
  children: React.ReactNode;
  context?: Context | null;
}) {
  return <FormContext.Provider value={context}>{children}</FormContext.Provider>;
}
