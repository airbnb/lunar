import React from 'react';
import Layout, { LayoutProps } from '../Layout';

export type OneColumnLayoutProps = LayoutProps;

/** A one-column layout. */
export default class OneColumnLayout extends React.Component<OneColumnLayoutProps> {
  render() {
    const { children, ...props } = this.props;

    return <Layout {...props}>{children}</Layout>;
  }
}
