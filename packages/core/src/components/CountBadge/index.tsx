import React, { useEffect, useRef } from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { styleSheetCountBadge } from './styles';

export type CountBadgeProps = {
  /** Accessibility label. */
  accessibilityLabel: string;
  /** Value to show in badge. */
  value: number;
  /** Play a waggle animation. */
  waggle?: boolean;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A badge indicator with a count. */
export default function CountBadge({
  accessibilityLabel,
  value,
  waggle,
  styleSheet,
}: CountBadgeProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetCountBadge);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (badgeRef.current?.animate) {
      badgeRef.current.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(1.1)', offset: 0.3 },
          { transform: 'scale(.95)', offset: 0.8 },
          { transform: 'scale(1)' },
        ],
        300,
      );
    }
  }, [value]);

  if (!value) {
    return null;
  }

  return (
    <div
      ref={badgeRef}
      className={cx(styles.badge, waggle ? styles.animateInAndWaggle : styles.animateIn)}
      aria-label={accessibilityLabel}
    >
      {value.toLocaleString()}
    </div>
  );
}
