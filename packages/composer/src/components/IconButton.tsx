import React from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';

const styleSheet: StyleSheet = ({ color, pattern, unit }) => ({
  button: {
    ...pattern.resetButton,
    color: color.core.primary[3],
    padding: unit / 2,

    '@selectors': {
      '[disabled]': {
        color: color.core.neutral[4],
        cursor: 'not-allowed',
      },

      ':not([disabled]):hover': {
        color: color.core.primary[5],
      },
    },
  },
});

export type IconButtonProps = {
  accessibilityLabel: string;
  disabled?: boolean;
  icon: React.ComponentType<{ accessibilityLabel?: string; size?: string | number }>;
  id?: string;
  onClick?: () => void;
};

export default function IconButton({
  accessibilityLabel,
  disabled,
  icon: Icon,
  id,
  onClick,
}: IconButtonProps) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <button
      className={cx(styles.button)}
      disabled={disabled}
      id={id}
      type="button"
      onClick={onClick}
    >
      <Icon accessibilityLabel={accessibilityLabel} size="1.65em" />
    </button>
  );
}
