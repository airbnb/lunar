import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { STATUSES } from '../../constants';

const statusPropType = mutuallyExclusiveTrueProps(...STATUSES);

export type Props = {
  /** Table cells to render. */
  children: NonNullable<React.ReactNode>;
  /** Dangerous/failure row (red). */
  danger?: boolean;
  /** Informational row (blue). */
  info?: boolean;
  /** Muted/disabled row (gray). */
  muted?: boolean;
  /** Notice row. */
  notice?: boolean;
  /** Successful row (green). */
  success?: boolean;
  /** Warning row (yellow). */
  warning?: boolean;
};

/** A table row that contains multiple cells. */
export class TableRow extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    danger: statusPropType,
    info: statusPropType,
    muted: statusPropType,
    notice: statusPropType,
    success: statusPropType,
    warning: statusPropType,
  };

  static defaultProps = {
    danger: false,
    info: false,
    muted: false,
    notice: false,
    success: false,
    warning: false,
  };

  render() {
    const {
      cx,
      children,
      danger,
      info,
      muted,
      notice,
      styles,
      success,
      warning,
      ...props
    } = this.props;

    return (
      <tr
        {...props}
        className={cx(
          danger && styles.row_danger,
          info && styles.row_info,
          muted && styles.row_muted,
          notice && styles.row_notice,
          success && styles.row_success,
          warning && styles.row_warning,
        )}
      >
        {children}
      </tr>
    );
  }
}

export default withStyles(({ color }) => {
  function createRow(hex: string) {
    return {
      // Overrides table specificity
      '@selectors': {
        ':nth-child(n) > td': {
          backgroundColor: hex,
        },
      },
    };
  }

  return {
    row_danger: createRow(color.core.danger[0]),
    row_info: createRow(color.core.primary[0]),
    row_muted: createRow(color.core.neutral[0]),
    row_notice: createRow(color.core.secondary[0]),
    row_success: createRow(color.core.success[0]),
    row_warning: createRow(color.core.warning[0]),
  };
})(TableRow);
