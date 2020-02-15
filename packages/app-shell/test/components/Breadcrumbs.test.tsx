import React from 'react';
import { render } from 'rut-dom';
import Breadcrumbs, { TrackBreadcrumb } from '../../src/components/Breadcrumbs';
import AppShell, { Props } from '../../src';

describe('Breadcrumbs', () => {
  it('renders all crumbs', () => {
    const { root } = render<Props>(
      <AppShell name="AppShell">
        <TrackBreadcrumb label="Foo" href="/foo" />
        <TrackBreadcrumb label="Bar" href="/foo/bar" />
        <TrackBreadcrumb label="Baz" href="/foo/bar/baz" />
        <Breadcrumbs accessibilityLabel="Foo" />
      </AppShell>,
    );

    expect(root.find('li')).toHaveLength(3);
  });
});
