import React from 'react';
import useStyles from '../../hooks/useStyles';
import { styleSheet } from './styles';

export type ShimmerProps = {
  /** Display as block instead of inline. */
  block?: boolean;
  /** Height of the bar. */
  height?: number | string;
  /** Width of the bar. Pass "random" to generate a random width. */
  width?: number | string;
  /** Border radius of the bar. */
  radius?: string;
};

/** A loading indicator bar that shimmers. */
export default function Shimmer({
  block,
  height = '1.25ex',
  radius = '0.125em',
  width = '60%',
}: ShimmerProps) {
  const [styles, cx] = useStyles(styleSheet);

  const randomWidth: string =
    width === 'random' ? `${Math.round(Math.random() * (90 - 30) + 30)}%` : '';

  return (
    <span
      aria-busy="true"
      style={{
        borderRadius: radius,
        width: randomWidth || width,
        height,
      }}
      className={cx(styles.shimmer, block && styles.shimmer_block)}
    />
  );
}
