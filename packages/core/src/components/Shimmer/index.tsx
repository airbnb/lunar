import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

export type Props = {
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
export class Shimmer extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    block: false,
    height: '1.25ex',
    radius: '0.125em',
    width: '60%',
  };

  randomWidth: string =
    this.props.width === 'random' ? `${Math.round(Math.random() * (90 - 30) + 30)}%` : '';

  render() {
    const { cx, block, height, radius, styles, width } = this.props;

    return (
      <span
        aria-busy="true"
        style={{
          borderRadius: radius,
          width: this.randomWidth || width,
          height,
        }}
        className={cx(styles.shimmer, block && styles.shimmer_block)}
      />
    );
  }
}

export default withStyles(() => ({
  shimmer: {
    animationDirection: 'alternate',
    animationDuration: '1s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationName: {
      name: 'shimmer',
      from: { opacity: 0.1 },
      to: { opacity: 0.3 },
    },
    animationTimingFunction: 'ease-in-out',
    backgroundColor: 'currentColor',
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle',
  },

  shimmer_block: {
    display: 'block',
  },
}))(Shimmer);
