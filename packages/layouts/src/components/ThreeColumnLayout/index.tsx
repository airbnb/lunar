import React from 'react';
import Layout, { LayoutProps } from '../Layout';

export type ThreeColumnLayoutProps = LayoutProps & {
  /** The after aside content. */
  after: NonNullable<React.ReactNode>;
  /** The before aside content. */
  before: NonNullable<React.ReactNode>;
};

/** A three-column layout. */
export default function ThreeColumnLayout({ children, ...props }: ThreeColumnLayoutProps) {
  return <Layout {...props}>{children}</Layout>;
}
