import React from 'react';
import Layout, { Props as LayoutProps } from '../Layout';

export type Props = LayoutProps & {
  /** The after aside content. */
  after: NonNullable<React.ReactNode>;
  /** The before aside content. */
  before: NonNullable<React.ReactNode>;
};

/** A fluid three-column layout with optional top and side navigation. */
export default class ThreeColumnLayout extends React.Component<Props> {
  render() {
    const { children, ...props } = this.props;

    return <Layout {...props}>{children}</Layout>;
  }
}
