import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import Text, { TextProps } from '../Text';
import { STATUSES } from '../../constants';
import { styleSheetStatusText } from './styles';

export type StatusTextProps = TextProps & {
  /** The text to render. */
  children: NonNullable<React.ReactNode>;
  /** Dangerous/failure status (red). */
  danger?: boolean;
  /** Informational status (blue). */
  info?: boolean;
  /** Muted/disabled status (gray). */
  muted?: boolean;
  /** Notice status. */
  notice?: boolean;
  /** Successful status (green). */
  success?: boolean;
  /** Warning status (yellow). */
  warning?: boolean;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** Display a string of classified text with colorful statuses. */
function StatusText({
  children,
  danger,
  info,
  muted,
  notice,
  success,
  warning,
  styleSheet,
  ...restProps
}: StatusTextProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetStatusText);

  return (
    <Text {...restProps}>
      <span
        className={cx(
          danger && styles.text_danger,
          info && styles.text_info,
          muted && styles.text_muted,
          notice && styles.text_notice,
          success && styles.text_success,
          warning && styles.text_warning,
        )}
      >
        {children}
      </span>
    </Text>
  );
}

const statusPropType = mutuallyExclusiveTrueProps(...STATUSES);

StatusText.propTypes = {
  danger: statusPropType,
  info: statusPropType,
  muted: statusPropType,
  notice: statusPropType,
  success: statusPropType,
  warning: statusPropType,
};

export default StatusText;
