/* eslint-disable max-classes-per-file, no-console, no-param-reassign, react/no-multi-comp, import/no-extraneous-dependencies */

import React from 'react';
import Enzyme, { ShallowWrapper } from 'enzyme';

export function wrapEnv(env: string, callback: () => any): () => any {
  return () => {
    const oldEnv = process.env.NODE_ENV;

    process.env.NODE_ENV = env;

    const response = callback();

    process.env.NODE_ENV = oldEnv;

    return response;
  };
}

export function wrapGlobal(
  property: keyof NodeJS.Global,
  callback: (spy: jest.Mock) => any,
): () => any {
  return () => {
    const old = global[property];

    global[property] = jest.fn();

    const response = callback(global[property]);

    global[property] = old;

    return response;
  };
}

export function wrapConsole(property: keyof Console, callback: (spy: jest.Mock) => any): () => any {
  return () => {
    const old = console[property];

    console[property] = jest.fn();

    const response = callback(console[property]);

    console[property] = old;

    return response;
  };
}

export function getWrapperName(wrapper: Enzyme.ShallowWrapper<any, any>): string {
  let name = wrapper.type();

  if (typeof name === 'function') {
    ({ name } = name);
  }

  if (!name || typeof name !== 'string') {
    return '_unknown_';
  }

  return name;
}

export function unwrapHOCs(
  wrapper: Enzyme.ShallowWrapper<any, any>,
  target: string,
  context: any = {},
  options: { exitOnContext?: boolean; render?: boolean } = {},
): Enzyme.ShallowWrapper<any, any> {
  let result = wrapper;

  // Unwrap all wrapping and annoying HOCs
  while (getWrapperName(result) !== target) {
    const type = result.type();

    if (typeof type === 'string') {
      result = result.children();
    } else if (
      typeof type === 'object' ||
      (typeof type === 'function' && type.name === 'TempConsumer') ||
      (typeof type === 'function' && type.name === 'TempProvider')
    ) {
      const child = result.prop('children');

      if (typeof child === 'function') {
        result = new ShallowWrapper((child as any)(context), result, { context });

        if (options.exitOnContext) {
          return result.shallow({ context });
        }
      } else {
        result = result.shallow({ context });
      }
    } else {
      result = result.shallow({ context });
    }
  }

  // Unwrap one more time to drill into the rendered HTML (children) of the target
  if (options.render) {
    result = result.shallow({ context });
  }

  return result;
}

export function unwrapIntoContext(wrapper: Enzyme.ShallowWrapper<any, any>, context: any) {
  return unwrapHOCs(wrapper, '_unknown_', context, { exitOnContext: true });
}

export function mockContextConsumer(context: React.Context<any>, state: any): () => void {
  const oldConsumer = context.Consumer;

  // @ts-ignore IGNORE
  context.Consumer = class TempConsumer extends React.Component<React.ConsumerProps<any>> {
    render() {
      return this.props.children(state);
    }
  };

  return () => {
    context.Consumer = oldConsumer;
  };
}

export function mockContextProvider(context: React.Context<any>): () => void {
  const oldProvider = context.Provider;

  // @ts-ignore IGNORE
  context.Provider = class TempProvider extends React.Component<React.ProviderProps<any>> {
    render() {
      return this.props.children || null;
    }
  };

  return () => {
    context.Provider = oldProvider;
  };
}

export function mockNotification() {
  const oldNotification = window.Notification;
  const mock: any = jest.fn(() => {
    let cb: any = null;
    const api = {
      close: jest.fn(),
      onclick: jest.fn(),
      addEventListener: (type: string, callback: any) => {
        cb = callback;
      },
      dispatchEvent: (event: Event) => {
        if (cb) {
          cb(event);
        }
      },
    };

    mock.lastInstance = api;

    return api;
  });

  mock.permission = 'default';
  mock.requestPermission = jest.fn().mockResolvedValue('granted');

  window.Notification = mock;

  return () => {
    window.Notification = oldNotification;
  };
}

export function mockResizeObserver() {
  const oldObserver = window.ResizeObserver;

  window.ResizeObserver = jest.fn(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  })) as any;

  return () => {
    window.ResizeObserver = oldObserver;
  };
}
