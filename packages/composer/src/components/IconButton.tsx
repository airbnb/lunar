import React from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import { iconButtonStyleSheet } from '../styles';

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
  const [styles, cx] = useStyles(iconButtonStyleSheet);

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
