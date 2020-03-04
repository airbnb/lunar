import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import Layout, { LayoutProps } from '../Layout';

const asidePropType = mutuallyExclusiveTrueProps('after', 'before');

export type TwoColumnLayoutProps = LayoutProps & {
  /** Display the aside after the content. */
  after?: boolean;
  /** The aside content. */
  aside: NonNullable<React.ReactNode>;
  /** Display the aside after the content. */
  before?: boolean;
};

/** A two-column layout. */
function TwoColumnLayout({ aside, after, before, children, ...props }: TwoColumnLayoutProps) {
  return (
    <Layout {...props} after={after ? aside : null} before={before ? aside : null}>
      {children}
    </Layout>
  );
}

TwoColumnLayout.propTypes = {
  after: asidePropType,
  before: asidePropType,
};

export default TwoColumnLayout;
