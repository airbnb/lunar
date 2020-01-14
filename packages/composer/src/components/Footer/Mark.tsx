import React from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import { footerMarkStyleSheet } from '../../styles';

export type MarkProps = {
  children?: React.ReactNode;
};

export default function Mark({ children }: MarkProps) {
  const [styles, cx] = useStyles(footerMarkStyleSheet);

  return <mark className={cx(styles.mark)}>{children}</mark>;
}
