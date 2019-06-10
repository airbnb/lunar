import React from 'react';
import { between } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

export type Props = {
  /** Disable leading rounded corners. */
  leading?: boolean;
  /** Percent in which the progess is complete, ranging from 0 to 100. */
  percent: number;
  /** Disable trailing rounded corners. */
  trailing?: boolean;
};

/** A bar to represent the progress to completion. */
export class ProgressBar extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    percent: between({ gte: 0, lte: 100 }).isRequired,
  };

  static defaultProps = {
    leading: false,
    trailing: false,
  };

  render() {
    const { cx, percent, leading, trailing, styles } = this.props;

    return (
      <div className={cx(styles.wrapper)}>
        <div
          className={cx(
            styles.bar,
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
            )}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(({ color, unit, ui }) => ({
  wrapper: {
    paddingTop: unit / 4,
    paddingBottom: unit / 4,
  },

  bar: {
    height: unit / 2,
    background: color.core.primary[1],
  },

  bar_leading: {
    borderTopRightRadius: ui.borderRadius,
    borderBottomRightRadius: ui.borderRadius,
  },

  bar_trailing: {
    borderTopLeftRadius: ui.borderRadius,
    borderBottomLeftRadius: ui.borderRadius,
  },

  progress: {
    background: color.core.primary[6],
  },
}))(ProgressBar);
