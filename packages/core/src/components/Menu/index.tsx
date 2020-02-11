import React from 'react';
import useStyles from '../../hooks/useStyles';
import Separator from './Separator';
import Item from './Item';
import Row from './Row';
import { styleSheet } from './styles';

export type MenuProps = {
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
export default function Menu({
  accessibilityLabel,
  children,
  maxHeight,
  minWidth = 200,
  overflow,
  role = 'menu',
}: MenuProps) {
  const scrollable = !!maxHeight && !overflow;
  const [styles, cx] = useStyles(styleSheet);

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

export { Item, Separator, Row };
