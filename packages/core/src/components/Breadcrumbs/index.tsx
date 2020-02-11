import React from 'react';
import List from '../List';
import Breadcrumb from './Breadcrumb';

export { Breadcrumb };

export type BreadcrumbsProps = {
  /** Accessibility label. */
  accessibilityLabel: string;
  /** List of `Breadcrumb`s. */
  children: NonNullable<React.ReactNode>;
};

/** A controller for multiple tabs. */
export default function Breadcrumbs({ accessibilityLabel, children }: BreadcrumbsProps) {
  return (
    <nav aria-label={accessibilityLabel}>
      <List horizontal ordered>
        {children}
      </List>
    </nav>
  );
}
