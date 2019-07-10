import React from 'react';
import { render, queryByText } from '@testing-library/react';
import Breadcrumbs, { TrackBreadcrumb } from '../../src/components/Breadcrumbs';
import AppShell from '../../src';

describe('Breadcrumbs', () => {
  function WrappingComponent({ children }: { children?: React.ReactNode }) {
    return <AppShell name="AppShell">{children!}</AppShell>;
  }

  it('renders all toasts', () => {
    const { debug } = render(
      <>
        <TrackBreadcrumb label="Foo" href="/foo" />
        <TrackBreadcrumb label="Bar" href="/foo/bar" />
        <TrackBreadcrumb label="Baz" href="/foo/bar/baz" />
        <Breadcrumbs accessibilityLabel="Foo" />
      </>,
      {
        wrapper: WrappingComponent,
      },
    );

    console.log(debug());

    // expect(getAllByRole('status')).toHaveLength(3);
  });
});
