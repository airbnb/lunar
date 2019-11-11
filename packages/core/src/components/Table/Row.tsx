import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles from '../../hooks/useStyles';
import { STATUSES } from '../../constants';
import { styleSheetRow as styleSheet } from './styles';

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
function TableRow({ children, danger, info, muted, notice, success, warning, ...props }: Props) {
  const [styles, cx] = useStyles(styleSheet);

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

const statusPropType = mutuallyExclusiveTrueProps(...STATUSES);

TableRow.propTypes = {
  danger: statusPropType,
  info: statusPropType,
  muted: statusPropType,
  notice: statusPropType,
  success: statusPropType,
  warning: statusPropType,
};

export default TableRow;
