import React from 'react';
import childrenWithComponentName from '../../prop-types/childrenWithComponentName';
import Content from './Content';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

export { Content };

const styleSheet: StyleSheet = ({ color, pattern }) => ({
  card: {
    ...pattern.box,
    background: color.accent.bg,
    overflow: 'hidden',
  },
});

export type Props = {
  /** List of `Content`s blocks to contain content. */
  children: NonNullable<React.ReactNode>;
};

/**
 * An abstract layout to use as a base for cards.
 */
function Card({ children }: Props) {
  const [styles, cx] = useStyles(styleSheet, 'Card');

  return <div className={cx(styles.card)}>{children}</div>;
}

Card.propTypes = {
  children: childrenWithComponentName('CardContent').isRequired,
};

export default Card;
