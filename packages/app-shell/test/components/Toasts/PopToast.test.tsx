import React from 'react';
import { render } from '@testing-library/react';
import PopToast from '../../../src/components/Toasts/PopToast';
import AppContext from '../../../src/components/AppContext';
import { Context } from '../../../src/types';

describe('PopToast', () => {
  let context: Partial<Context>;

  beforeEach(() => {
    context = {
      addFailureToast: jest.fn(),
      addRefreshToast: jest.fn(),
      addSuccessToast: jest.fn(),
      addInfoToast: jest.fn(),
    };
  });

  function WrappingComponent({ children }: { children?: React.ReactNode }) {
    return <AppContext.Provider value={context as any}>{children}</AppContext.Provider>;
  }

  it('adds a failure toast', () => {
    render(<PopToast message="Hello" delay={123} danger />, { wrapper: WrappingComponent });

    expect(context.addFailureToast).toHaveBeenCalledWith('Hello', { danger: true, delay: 123 });
  });

  it('adds a success toast', () => {
    render(<PopToast message="Hello" duration={123} success />, { wrapper: WrappingComponent });

    expect(context.addSuccessToast).toHaveBeenCalledWith('Hello', { success: true, duration: 123 });
  });

  it('adds a refresh toast', () => {
    render(<PopToast message="Hello" refresh />, { wrapper: WrappingComponent });

    expect(context.addRefreshToast).toHaveBeenCalledWith('Hello', { refresh: true });
  });

  it('adds an info toast by default', () => {
    const spy = jest.fn();

    render(<PopToast message="Hello" onClose={spy} />, { wrapper: WrappingComponent });

    expect(context.addInfoToast).toHaveBeenCalledWith('Hello', { onClose: spy });
  });

  it('adds an error toast if message is an `Error`', () => {
    const error = new Error('Oops');

    render(<PopToast message={error} />, { wrapper: WrappingComponent });

    expect(context.addFailureToast).toHaveBeenCalledWith(error, {});
  });

  it('only adds the toast once', () => {
    const { rerender } = render(<PopToast message="Hi" />, { wrapper: WrappingComponent });

    rerender(<PopToast message="Hi" />);
    rerender(<PopToast message="Hi" />);
    rerender(<PopToast message="Hi" />);

    expect(context.addInfoToast).toHaveBeenCalledTimes(1);
  });

  it('doesnt add a toast if no context', () => {
    render(<PopToast message="Hi" />);

    expect(context.addInfoToast).not.toHaveBeenCalled();
  });
});
