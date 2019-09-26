import React from 'react';
import { render } from '@testing-library/react';
import Toasts from '../../src/components/Toasts';
import AppContext, { defaultContext } from '../../src/components/AppContext';

describe('Toasts', () => {
  const toasts = [
    {
      id: '1',
      message: 'Foo',
      props: {
        duration: 0,
        danger: true,
      },
    },
    {
      id: '2',
      message: 'Bar',
      props: {
        duration: 0,
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
      <AppContext.Provider value={{ ...defaultContext, toasts }}>{children}</AppContext.Provider>
    );
  }

  it('renders all toasts', () => {
    const { getAllByRole } = render(<Toasts />, { wrapper: WrappingComponent });

    expect(getAllByRole('status')).toHaveLength(3);
  });

  // it.skip('renders toasts in reverse', () => {
  //   const { getAllByRole } = render(<Toasts />, { wrapper: WrappingComponent });
  //   const rows = getAllByRole('status');

  //   expect(queryByText(rows[0], 'Baz')).not.toBeNull();
  //   expect(queryByText(rows[1], 'Bar')).not.toBeNull();
  //   expect(queryByText(rows[2], 'Foo')).not.toBeNull();
  // });
});
