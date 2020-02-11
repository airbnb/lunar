import React from 'react';
import { mutuallyExclusiveTrueProps, between } from 'airbnb-prop-types';
import useStyles from '../../hooks/useStyles';
import { styleSheet } from './styles';
import { STATUSES } from '../../constants';

export type ProgressBarProps = {
  /** Dangerous/failure status (red). */
  danger?: boolean;
  /** Disable leading rounded corners. */
  leading?: boolean;
  /** Muted/disabled status (gray). */
  muted?: boolean;
  /** Notice status. */
  notice?: boolean;
  /** Percent in which the progess is complete, ranging from 0 to 100. */
  percent: number;
  /** Successful status (green). */
  success?: boolean;
  /** Disable trailing rounded corners. */
  trailing?: boolean;
  /** Warning status (yellow). */
  warning?: boolean;
};

/** A bar to represent the progress to completion. */
function ProgressBar({
  danger,
  leading,
  muted,
  notice,
  percent,
  success,
  trailing,
  warning,
}: ProgressBarProps) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.wrapper)}>
      <div
        className={cx(
          styles.bar,
          danger && styles.bar_danger,
          muted && styles.bar_muted,
          notice && styles.bar_notice,
          success && styles.bar_success,
          warning && styles.bar_warning,
          !leading && styles.bar_leading,
          !trailing && styles.bar_trailing,
        )}
      >
        <div
          className={cx(
            styles.bar,
            !leading && styles.bar_leading,
            !trailing && styles.bar_trailing,
            styles.progress,
            danger && styles.progress_danger,
            muted && styles.progress_muted,
            notice && styles.progress_notice,
            success && styles.progress_success,
            warning && styles.progress_warning,
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

const statusPropType = mutuallyExclusiveTrueProps(...STATUSES);

ProgressBar.propTypes = {
  danger: statusPropType,
  info: statusPropType,
  muted: statusPropType,
  notice: statusPropType,
  percent: between({ gte: 0, lte: 100 }).isRequired,
  success: statusPropType,
  warning: statusPropType,
};

export default ProgressBar;
