import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { styleSheetSeparator } from './styles';

export type MenuSeparatorProps = {
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A separator between menu items. */
export default function MenuSeparator({ styleSheet }: MenuSeparatorProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetSeparator);

  return (
    <li role="separator">
      <hr className={cx(styles.separator)} />
    </li>
  );
}
