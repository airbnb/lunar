import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Separator from './Separator';
import Item from './Item';
import Row from './Row';

export type Props = {
  /** List of `Row`s, `Item`s, and `Separator`s to render in the menu. */
  children?: React.ReactNode;
  /** Accessibility label. */
  accessibilityLabel: string;
  /** Maximum height of the menu before scrolling. */
  maxHeight?: number;
  /** Minimum width of the menu. */
  minWidth?: number;
  /** Accessibility role. */
  role?: string;
  /** Whether or not the menu has visible overflow. */
  overflow?: boolean;
};

/** An abstract menu for use within dropdowns, selects, autocompletes, and more. */
export class Menu extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    children: null,
    minWidth: 200,
    overflow: false,
    role: 'menu',
  };

  render() {
    const {
      cx,
      accessibilityLabel,
      children,
      maxHeight,
      minWidth,
      overflow,
      role,
      styles,
    } = this.props;
    const scrollable = !!maxHeight && !overflow;

    return (
      <ul
        role={role}
        aria-label={accessibilityLabel}
        className={cx(
          styles.menu,
          { maxHeight: scrollable ? maxHeight : 'auto', minWidth },
          scrollable && styles.menu_scrollable,
        )}
      >
        {children}
      </ul>
    );
  }
}

export { Item, Separator, Row };

export default withStyles(({ color, ui, pattern }) => ({
  menu: {
    ...pattern.box,
    margin: 0,
    padding: 0,
    backgroundColor: color.accent.bg,
    listStyle: 'none',

    '@selectors': {
      '> li': {
        position: 'relative',
      },

      // These are jank. Better way?
      '> li:first-child > *': {
        borderTopLeftRadius: ui.borderRadius,
        borderTopRightRadius: ui.borderRadius,
      },

      '> li:last-child > *': {
        borderBottomLeftRadius: ui.borderRadius,
        borderBottomRightRadius: ui.borderRadius,
      },
    },
  },

  menu_scrollable: {
    overflowY: 'auto',
  },
}))(Menu);
