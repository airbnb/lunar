import React from 'react';
import useStyles from '../../hooks/useStyles';
import { styleSheetRow as styleSheet } from './styles';

export type Props = {
  /** Content to display in the row. */
  children: NonNullable<React.ReactNode>;
  /** Double the padding and spacing. */
  spacious?: boolean;
};

/** A non-interactive row within a menu. */
export default function MenuRow({ children, spacious }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <li role="none">
      <div className={cx(styles.item, spacious && styles.item_spacious)}>{children}</div>
    </li>
  );
}
