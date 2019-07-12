import React from 'react';
import Content from './Content';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

export { Content };

const styleSheet: StyleSheet = ({ color, pattern }) => ({
  card: {
    ...pattern.box,
    background: color.accent.bg,
    overflow: 'hidden',
  },

  card_overflow: {
    overflow: 'visible',
  },
});

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
