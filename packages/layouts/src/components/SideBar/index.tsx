import React from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';
import Item from './Item';
import { styleSheetSideBar } from './styles';

export type SideBarProps = {
  /** Accessibility label. */
  accessibilityLabel: string;
  /** Navigation items to render within the bar. */
  children: NonNullable<React.ReactNode>;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A vertical sidebar navigation menu. Primarily aligned on the left viewport. */
export default function SideBar({ accessibilityLabel, children, styleSheet }: SideBarProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetSideBar);

  return (
    <nav className={cx(styles.bar)}>
      <ul role="menubar" aria-label={accessibilityLabel} className={cx(styles.list)}>
        {children}
      </ul>
    </nav>
  );
}

export { Item };
