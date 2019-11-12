import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { styleSheet } from './styles';

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
        ref={this.badgeRef}
        className={cx(styles.badge, waggle ? styles.animateInAndWaggle : styles.animateIn)}
        aria-label={accessibilityLabel}
      >
        {value.toLocaleString()}
      </div>
    );
  }
}

export default withStyles(styleSheet)(CountBadge);
