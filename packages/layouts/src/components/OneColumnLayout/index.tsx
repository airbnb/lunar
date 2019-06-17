import React from 'react';
import Layout, { Props as LayoutProps } from '../Layout';

export type Props = LayoutProps;

/** A one-column layout. */
export default class OneColumnLayout extends React.Component<Props> {
  render() {
    const { children, ...props } = this.props;

    return <Layout {...props}>{children}</Layout>;
  }
}
