import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import Layout, { Props as LayoutProps } from '../Layout';

const asidePropType = mutuallyExclusiveTrueProps('after', 'before');

export type Props = LayoutProps & {
  /** Display the aside after the content. */
  after?: boolean;
  /** The aside content. */
  aside: NonNullable<React.ReactNode>;
  /** Display the aside after the content. */
  before?: boolean;
};

/** A two-column layout. */
export default class TwoColumnLayout extends React.Component<Props> {
  static propTypes = {
    after: asidePropType,
    before: asidePropType,
  };

  render() {
    const { aside, after, before, children, ...props } = this.props;

    return (
      <Layout {...props} after={after ? aside : null} before={before ? aside : null}>
        {children}
      </Layout>
    );
  }
}
