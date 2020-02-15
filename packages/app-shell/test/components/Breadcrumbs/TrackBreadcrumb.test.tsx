import React from 'react';
import { render } from 'rut-dom';
import TrackBreadcrumb, { Props } from '../../../src/components/Breadcrumbs/TrackBreadcrumb';
import AppContext, { defaultContext } from '../../../src/components/AppContext';
import { Context } from '../../../src/types';

describe('TrackBreadcrumb', () => {
  let context: Context;

  beforeEach(() => {
    context = {
      ...defaultContext,
      addBreadcrumb: jest.fn(() => '123'),
      removeBreadcrumb: jest.fn(),
    };
  });

  function WrappingComponent({ children }: { children?: React.ReactNode }) {
    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
  }

  it('adds a crumb', () => {
    render<Props>(<TrackBreadcrumb label="Foo" href="/foo" />, { wrapper: <WrappingComponent /> });

    expect(context.addBreadcrumb).toHaveBeenCalledWith('Foo', { href: '/foo' });
  });

  it('removes a crumb when unmounted', () => {
    const { unmount } = render<Props>(<TrackBreadcrumb label="Foo" href="/foo" />, {
      wrapper: <WrappingComponent />,
    });

    unmount();

    expect(context.removeBreadcrumb).toHaveBeenCalledWith('123');
  });

  it('only adds the crumb once', () => {
    const { update } = render<Props>(<TrackBreadcrumb label="Foo" />, {
      wrapper: <WrappingComponent />,
    });

    update({ label: 'Foo' });
    update({ label: 'Foo' });
    update({ label: 'Foo' });

    expect(context.addBreadcrumb).toHaveBeenCalledTimes(1);
  });

  it('doesnt add a crumb if no context', () => {
    render<Props>(<TrackBreadcrumb label="Foo" />);

    expect(context.addBreadcrumb).not.toHaveBeenCalled();
  });
});
