import React from 'react';
import Content from './Content';
import useStyles from '../../hooks/useStyles';
import { styleSheet } from './styles';

export { Content };

export type Props = {
  /** List of `Content`s blocks to contain content. */
  children: NonNullable<React.ReactNode>;
  /** Set overflow to be visible. */
  overflow?: boolean;
};

/**
 * An abstract layout to use as a base for cards.
 */
export default function Card({ children, overflow }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  return <div className={cx(styles.card, overflow && styles.card_overflow)}>{children}</div>;
}
