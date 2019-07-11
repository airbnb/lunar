import React from 'react';
import { render } from '@testing-library/react';
import TrackBreadcrumb from '../../../src/components/Breadcrumbs/TrackBreadcrumb';
import AppContext from '../../../src/components/AppContext';
import { Context } from '../../../src/types';

describe('TrackBreadcrumb', () => {
  let context: Partial<Context>;

  beforeEach(() => {
    context = {
      addBreadcrumb: jest.fn(() => '123'),
      removeBreadcrumb: jest.fn(),
    };
  });

  function WrappingComponent({ children }: { children?: React.ReactNode }) {
    return <AppContext.Provider value={context as any}>{children}</AppContext.Provider>;
  }

  it('adds a crumb', () => {
    render(<TrackBreadcrumb label="Foo" href="/foo" />, { wrapper: WrappingComponent });

    expect(context.addBreadcrumb).toHaveBeenCalledWith('Foo', { href: '/foo' });
  });

  it('removes a crumb when unmounted', () => {
    const { unmount } = render(<TrackBreadcrumb label="Foo" href="/foo" />, {
      wrapper: WrappingComponent,
    });

    unmount();

    expect(context.removeBreadcrumb).toHaveBeenCalledWith('123');
  });

  it('only adds the crumb once', () => {
    const { rerender } = render(<TrackBreadcrumb label="Foo" />, { wrapper: WrappingComponent });

    rerender(<TrackBreadcrumb label="Foo" />);
    rerender(<TrackBreadcrumb label="Foo" />);
    rerender(<TrackBreadcrumb label="Foo" />);

    expect(context.addBreadcrumb).toHaveBeenCalledTimes(1);
  });

  it('doesnt add a crumb if no context', () => {
    render(<TrackBreadcrumb label="Foo" />);

    expect(context.addBreadcrumb).not.toHaveBeenCalled();
  });
});
