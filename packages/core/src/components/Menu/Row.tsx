import React from 'react';
import useStyles from '../../hooks/useStyles';
import { styleSheetRow as styleSheet } from './styles';

export type MenuRowProps = {
  /** Content to display in the row. */
  children: NonNullable<React.ReactNode>;
  /** Double the padding and spacing. */
  spacious?: boolean;
};

/** A non-interactive row within a menu. */
export default function MenuRow({ children, spacious }: MenuRowProps) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <li role="none">
      <div className={cx(styles.item, spacious && styles.item_spacious)}>{children}</div>
    </li>
  );
}
