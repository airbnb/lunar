import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

function createPosition(offset: number | string) {
  if (typeof offset === 'number' && offset < 0) {
    return { right: Math.abs(offset) };
  }

  return { left: offset };
}

export const NOTCH_SIZE = 1.5;
export const NOTCH_SPACING = 1.5;

export type Props = {
  /** Content to be displayed. */
  children: NonNullable<React.ReactNode>;
  /** True to use inline-block container. */
  inline?: boolean;
  /** Toggle dark mode. */
  inverted?: boolean;
  /** True to have the notch show up on the bottom the box. */
  notchBelow?: boolean;
  /** Offset of the notch (can be a CSS size eg "50%"). */
  notchOffset?: number | string;
};

/** A container with a configurable arrow pointing outward. */
export class NotchedBox extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    inline: false,
    inverted: false,
  };

  render() {
    const { cx, styles, inverted, children, inline, notchBelow, notchOffset } = this.props;

    return (
      <div className={cx(styles.box, !inverted && styles.border, inline && styles.box_inline)}>
        <div
          className={cx(
            styles.notch,
            notchOffset ? createPosition(notchOffset) : styles.notch_position,
            notchBelow && styles.notch_below,
            inverted ? styles.inverted : styles.border,
          )}
        />

        <div className={cx(styles.content, inverted && styles.inverted)}>{children}</div>
      </div>
    );
  }
}

export default withStyles(({ ui, color, unit }) => {
  const { border, borderRadius } = ui;
  const notchSide = NOTCH_SIZE * unit;
  const offset = -notchSide / 2;
  const left = unit + notchSide / Math.SQRT2;

  return {
    box: {
      position: 'relative',
      borderRadius,
    },

    box_inline: {
      display: 'inline-block',
    },

    notch: {
      width: notchSide,
      height: notchSide,
      position: 'absolute',
      backgroundColor: color.accent.bg,
      transform: `translate(${offset}px, ${offset}px) rotate(-45deg)`,
    },

    notch_position: createPosition(left),

    notch_below: {
      bottom: -notchSide,
    },

    border: {
      border,
    },

    inverted: {
      borderColor: color.clear,
      backgroundColor: color.core.neutral[6],
    },

    content: {
      padding: NOTCH_SPACING * unit,
      position: 'relative',
      backgroundColor: color.accent.bg,
      borderRadius,
    },
  };
})(NotchedBox);
