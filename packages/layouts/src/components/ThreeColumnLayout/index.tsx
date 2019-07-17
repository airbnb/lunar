import React from 'react';
import Layout, { Props as LayoutProps } from '../Layout';

export type Props = LayoutProps & {
  /** The after aside content. */
  after: NonNullable<React.ReactNode>;
  /** The before aside content. */
  before: NonNullable<React.ReactNode>;
};

/** A three-column layout. */
export default function ThreeColumnLayout({ children, ...props }: Props) {
  return <Layout {...props}>{children}</Layout>;
}
