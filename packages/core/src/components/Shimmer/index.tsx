import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { styleSheetShimmer } from './styles';

export type ShimmerProps = {
  /** Display as block instead of inline. */
  block?: boolean;
  /** Height of the bar. */
  height?: number | string;
  /** Width of the bar. Pass "random" to generate a random width. */
  width?: number | string;
  /** Border radius of the bar. */
  radius?: string;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A loading indicator bar that shimmers. */
export default function Shimmer({
  block,
  height = '1.25ex',
  radius = '0.125em',
  width = '60%',
  styleSheet,
}: ShimmerProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetShimmer);

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
