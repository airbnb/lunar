import React from 'react';
import withStyles, { WithStylesProps } from '@airbnb/lunar/lib/composers/withStyles';

export type Props = {
  children: NonNullable<React.ReactNode>;
};

export class ShellLayout extends React.Component<Props & WithStylesProps> {
  render() {
    const { cx, children, styles } = this.props;

    return <div className={cx(styles.layout)}>{children}</div>;
  }
}

export default withStyles(() => ({
  layout: {
    height: '100vh',
  },
}))(ShellLayout);
