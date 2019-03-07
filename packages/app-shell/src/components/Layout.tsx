import React from 'react';
import withStyles, { css, WithStylesProps } from '@airbnb/lunar/lib/composers/withStyles';

export type Props = {
  children: NonNullable<React.ReactNode>;
};

export class ShellLayout extends React.Component<Props & WithStylesProps> {
  render() {
    const { children, styles } = this.props;

    return <div {...css(styles.layout)}>{children}</div>;
  }
}

export default withStyles(() => ({
  layout: {
    height: '100vh',
  },
}))(ShellLayout);
