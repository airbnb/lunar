import React from 'react';
import Layout, { LayoutProps } from '../Layout';

export type OneColumnLayoutProps = LayoutProps;

/** A one-column layout. */
export default function OneColumnLayout({ children, ...props }: OneColumnLayoutProps) {
  return <Layout {...props}>{children}</Layout>;
}
