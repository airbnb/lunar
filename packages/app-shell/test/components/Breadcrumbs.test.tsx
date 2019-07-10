import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumbs, { TrackBreadcrumb } from '../../src/components/Breadcrumbs';
import AppShell from '../../src';

describe('Breadcrumbs', () => {
  it('renders all crumbs', () => {
    const { container } = render(
      <AppShell name="AppShell">
        <TrackBreadcrumb label="Foo" href="/foo" />
        <TrackBreadcrumb label="Bar" href="/foo/bar" />
        <TrackBreadcrumb label="Baz" href="/foo/bar/baz" />
        <Breadcrumbs accessibilityLabel="Foo" />
      </AppShell>,
    );

    expect(container.querySelectorAll('ol > li')).toHaveLength(3);
  });
});
