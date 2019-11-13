import React from 'react';
import { between } from 'airbnb-prop-types';
import useStyles from '../../hooks/useStyles';
import { styleSheet } from './styles';

export type Props = {
  /** Disable leading rounded corners. */
  leading?: boolean;
  /** Percent in which the progess is complete, ranging from 0 to 100. */
  percent: number;
  /** Disable trailing rounded corners. */
  trailing?: boolean;
};

/** A bar to represent the progress to completion. */
function ProgressBar({ percent, leading, trailing }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.wrapper)}>
      <div
        className={cx(styles.bar, !leading && styles.bar_leading, !trailing && styles.bar_trailing)}
      >
        <div
          className={cx(
            styles.bar,
            !leading && styles.bar_leading,
            !trailing && styles.bar_trailing,
            styles.progress,
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  percent: between({ gte: 0, lte: 100 }).isRequired,
};

export default ProgressBar;
