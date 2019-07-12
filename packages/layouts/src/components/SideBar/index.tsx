import React from 'react';
import withStyles, { WithStylesProps } from '@airbnb/lunar/lib/composers/withStyles';
import Item from './Item';

export type Props = {
  /** Accessibility label. */
  accessibilityLabel: string;
  /** Navigation items to render within the bar. */
  children: NonNullable<React.ReactNode>;
};

/** A vertical sidebar navigation menu. Primarily aligned on the left viewport. */
export class SideBar extends React.Component<Props & WithStylesProps> {
  render() {
    const { cx, accessibilityLabel, children, styles } = this.props;

    return (
      <nav className={cx(styles.bar)}>
        <ul role="menubar" aria-label={accessibilityLabel} className={cx(styles.list)}>
          {children}
        </ul>
      </nav>
    );
  }
}

export { Item };

export default withStyles(({ unit, color }) => ({
  bar: {
    width: unit * 8,
    height: '100%',
    background: color.core.neutral[5],
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,

    '@selectors': {
      '> li': {
        listStyle: 'none',
        margin: 0,
      },
    },
  },
}))(SideBar);
