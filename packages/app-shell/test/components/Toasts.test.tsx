import React from 'react';
import { render, queryByText } from '@testing-library/react';
import Toasts from '../../src/components/Toasts';
import AppContext from '../../src/components/AppContext';

describe('Toasts', () => {
  const toasts = [
    {
      id: '1',
      message: 'Foo',
      props: {
        danger: true,
      },
    },
    {
      id: '2',
      message: 'Bar',
      props: {
        success: true,
      },
    },
    {
      id: '3',
      message: 'Baz',
      props: {
        duration: 0,
        refresh: true,
      },
    },
  ];

  function WrappingComponent({ children }: { children?: React.ReactNode }) {
    return (
      <AppContext.Provider value={{ toasts, onRemove() {} } as any}>{children}</AppContext.Provider>
    );
  }

  it('renders all toasts', () => {
    const { getAllByRole } = render(<Toasts />, { wrapper: WrappingComponent });

    expect(getAllByRole('status')).toHaveLength(3);
  });

  it('renders toasts in reverse', () => {
    const { getAllByRole } = render(<Toasts />, { wrapper: WrappingComponent });
    const rows = getAllByRole('status');

    expect(queryByText(rows[0], 'Baz')).not.toBeNull();
    expect(queryByText(rows[1], 'Bar')).not.toBeNull();
    expect(queryByText(rows[2], 'Foo')).not.toBeNull();
  });
});
