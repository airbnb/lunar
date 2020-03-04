import React from 'react';
import { render } from 'rut-dom';
import PopToast, { PopToastProps } from '../../../src/components/Toasts/PopToast';
import AppContext, { defaultContext } from '../../../src/components/AppContext';
import { Context } from '../../../src/types';

describe('PopToast', () => {
  let context: Context;

  beforeEach(() => {
    context = {
      ...defaultContext,
      addFailureToast: jest.fn(),
      addRefreshToast: jest.fn(),
      addSuccessToast: jest.fn(),
      addInfoToast: jest.fn(),
    };
  });

  function WrappingComponent({ children }: { children?: React.ReactNode }) {
    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
  }

  it('adds a failure toast', () => {
    render<PopToastProps>(<PopToast danger message="Hello" delay={123} />, {
      wrapper: <WrappingComponent />,
    });

    expect(context.addFailureToast).toHaveBeenCalledWith('Hello', { danger: true, delay: 123 });
  });

  it('adds a success toast', () => {
    render<PopToastProps>(<PopToast success message="Hello" duration={123} />, {
      wrapper: <WrappingComponent />,
    });

    expect(context.addSuccessToast).toHaveBeenCalledWith('Hello', { success: true, duration: 123 });
  });

  it('adds a refresh toast', () => {
    render<PopToastProps>(<PopToast refresh message="Hello" />, { wrapper: <WrappingComponent /> });

    expect(context.addRefreshToast).toHaveBeenCalledWith('Hello', { refresh: true });
  });

  it('adds an info toast by default', () => {
    const spy = jest.fn();

    render<PopToastProps>(<PopToast message="Hello" onClose={spy} />, {
      wrapper: <WrappingComponent />,
    });

    expect(context.addInfoToast).toHaveBeenCalledWith('Hello', { onClose: spy });
  });

  it('adds an error toast if message is an `Error`', () => {
    const error = new Error('Oops');

    render<PopToastProps>(<PopToast message={error} />, { wrapper: <WrappingComponent /> });

    expect(context.addFailureToast).toHaveBeenCalledWith(error, {});
  });

  it('only adds the toast once', () => {
    const { update } = render<PopToastProps>(<PopToast message="Hi" />, {
      wrapper: <WrappingComponent />,
    });

    update({ message: 'Hi' });
    update({ message: 'Hi' });
    update({ message: 'Hi' });

    expect(context.addInfoToast).toHaveBeenCalledTimes(1);
  });

  it('doesnt add a toast if no context', () => {
    render<PopToastProps>(<PopToast message="Hi" />);

    expect(context.addInfoToast).not.toHaveBeenCalled();
  });
});
