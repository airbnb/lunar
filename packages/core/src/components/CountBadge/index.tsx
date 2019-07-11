import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

export type Props = {
  /** Accessibility label. */
  accessibilityLabel: string;
  /** Value to show in badge. */
  value: number;
  /** Play a waggle animation. */
  waggle?: boolean;
};

/** A badge indicator with a count. */
export class CountBadge extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    waggle: false,
  };

  badgeRef = React.createRef<HTMLDivElement>();

  componentDidUpdate(prevProps: Props) {
    const { value } = this.props;

    if (value && prevProps.value && value !== prevProps.value) {
      this.runPopAnimation();
    }
  }

  runPopAnimation() {
    if (this.badgeRef.current) {
      this.badgeRef.current.animate(
        // @ts-ignore Bug: https://github.com/Microsoft/TypeScript/issues/26073
        [
          { transform: 'scale(1)' },
          { transform: 'scale(1.1)', offset: 0.3 },
          { transform: 'scale(.95)', offset: 0.8 },
          { transform: 'scale(1)' },
        ],
        300,
      );
    }
  }

  render() {
    const { cx, accessibilityLabel, styles, value, waggle } = this.props;

    if (!value) {
      return null;
    }

    return (
      <div
        className={cx(styles.badge, waggle ? styles.animateInAndWaggle : styles.animateIn)}
        ref={this.badgeRef}
        aria-label={accessibilityLabel}
      >
        {value.toLocaleString()}
      </div>
    );
  }
}

export default withStyles(({ color, font, unit }) => {
  const waggleDuration = 300;
  const totalDuration = 2000 + waggleDuration;
  const wagglePercent = (waggleDuration / totalDuration) * 100;
  const delayPercent = 100 - wagglePercent;
  const waggleFrames = {
    name: 'waggle',
    [`${delayPercent}%`]: { transform: 'rotate(0deg)' },
    [`${wagglePercent * 0.3 + delayPercent}%`]: { transform: 'rotate(25deg)' },
    [`${wagglePercent * 0.8 + delayPercent}%`]: { transform: 'rotate(-10deg)' },
  };
  const inFrames = {
    name: 'animateIn',
    '0%': {
      transform: 'scale(0)',
      opacity: 0,
    },
    '60%': {
      transform: 'scale(1.1)',
      opacity: 1,
    },
    '80%': {
      transform: 'scale(.95)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  };

  return {
    badge: {
      ...font.textSmall,
      backgroundColor: color.core.danger[6],
      color: color.base,
      textAlign: 'center',
      fontWeight: 'bold',
      padding: unit / 4,
      borderRadius: unit * 2,
      minWidth: unit * 4,
      boxSizing: 'border-box',
      display: 'inline-block',
    },

    animateInAndWaggle: {
      animationDuration: `500ms, ${totalDuration}ms`,
      animationName: [inFrames, waggleFrames],
      animationIterationCount: '1, infinite',
      animationDelay: '0s, 500ms',
    },

    animateIn: {
      animationDuration: '500ms',
      animationName: inFrames,
    },
  };
})(CountBadge);
