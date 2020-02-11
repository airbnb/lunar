import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles from '../../hooks/useStyles';
import iconComponent from '../../prop-types/iconComponent';
import IconAffix from '../private/IconAffix';
import { STATUSES, BRANDS } from '../../constants';
import { styleSheet } from './styles';

export type StatusLabelProps = {
  /** Icon to display at the end of the content. */
  afterIcon?: React.ReactNode;
  /** Icon to display at the start of the content. */
  beforeIcon?: React.ReactNode;
  /** Apply a border. */
  bordered?: boolean;
  /** Content within the label. */
  children: NonNullable<React.ReactNode>;
  /** Use compact padding. */
  compact?: boolean;
  /** Dangerous/failure status (red). */
  danger?: boolean;
  /** Informational status (blue). */
  info?: boolean;
  /** Invert background and text colors. */
  inverted?: boolean;
  /** Luxury brand. */
  luxury?: boolean;
  /** Muted/disabled status (gray). */
  muted?: boolean;
  /** Notice status. */
  notice?: boolean;
  /** Plus brand. */
  plus?: boolean;
  /** Successful status (green). */
  success?: boolean;
  /** Uppercase all text. */
  uppercased?: boolean;
  /** Warning status (yellow). */
  warning?: boolean;
};

/** Classify content through the use of tiny colorful status labels. */
function StatusLabel({
  afterIcon,
  beforeIcon,
  bordered,
  children,
  compact,
  danger,
  info,
  inverted,
  luxury,
  muted,
  notice,
  plus,
  success,
  uppercased,
  warning,
}: StatusLabelProps) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <span
      className={cx(
        styles.label,
        uppercased && styles.label_uppercased,
        inverted && styles.label_inverted,
        bordered && styles.label_bordered,
        compact && styles.label_compact,
        danger && (inverted ? styles.label_inverted_danger : styles.label_danger),
        info && (inverted ? styles.label_inverted_info : styles.label_info),
        muted && (inverted ? styles.label_inverted_muted : styles.label_muted),
        notice && (inverted ? styles.label_inverted_notice : styles.label_notice),
        success && (inverted ? styles.label_inverted_success : styles.label_success),
        warning && (inverted ? styles.label_inverted_warning : styles.label_warning),
        luxury && (inverted ? styles.label_inverted_luxury : styles.label_luxury),
        plus && (inverted ? styles.label_inverted_plus : styles.label_plus),
      )}
    >
      {beforeIcon && <IconAffix before>{beforeIcon}</IconAffix>}

      <span>{children}</span>

      {afterIcon && <IconAffix after>{afterIcon}</IconAffix>}
    </span>
  );
}

const statusPropType = mutuallyExclusiveTrueProps(...STATUSES, ...BRANDS);

StatusLabel.propTypes = {
  afterIcon: iconComponent,
  beforeIcon: iconComponent,
  danger: statusPropType,
  info: statusPropType,
  luxury: statusPropType,
  muted: statusPropType,
  notice: statusPropType,
  plus: statusPropType,
  success: statusPropType,
  warning: statusPropType,
};

export default StatusLabel;
