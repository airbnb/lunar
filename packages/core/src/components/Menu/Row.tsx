import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { styleSheetRow } from './styles';

export type MenuRowProps = {
  /** Content to display in the row. */
  children: NonNullable<React.ReactNode>;
  /** Double the padding and spacing. */
  spacious?: boolean;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A non-interactive row within a menu. */
export default function MenuRow({ children, spacious, styleSheet }: MenuRowProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetRow);

  return (
    <li role="none">
      <div className={cx(styles.item, spacious && styles.item_spacious)}>{children}</div>
    </li>
  );
}
