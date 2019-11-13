import React from 'react';
import useStyles from '../../hooks/useStyles';
import { styleSheetSeparator as styleSheet } from './styles';

/** A separator between menu items. */
export default function MenuSeparator() {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <li role="separator">
      <hr className={cx(styles.separator)} />
    </li>
  );
}
