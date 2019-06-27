import React from 'react';
import { elementType } from 'airbnb-prop-types';
import Layout, { Props as LayoutProps } from '../Layout';
import Aside from '../Aside';

export type Props = LayoutProps & {
  /** The after aside content. */
  after: NonNullable<React.ReactNode>;
  /** The before aside content. */
  before: NonNullable<React.ReactNode>;
};

/** A three-column layout. */
export default class ThreeColumnLayout extends React.Component<Props> {
  static propTypes = {
    after: elementType(Aside).isRequired,
    before: elementType(Aside).isRequired,
  };

  render() {
    const { children, ...props } = this.props;

    return <Layout {...props}>{children}</Layout>;
  }
}
