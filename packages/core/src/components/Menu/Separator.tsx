import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { styleSheetSeparator as styleSheet } from './styles';

/** A separator between menu items. */
export default function MenuSeparator() {
  const [styles, cx] = useStyles(styleSheet ?? styleSheet);

  return (
    <li role="separator">
      <hr className={cx(styles.separator)} />
    </li>
  );
}
