import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { STATUSES } from '../../constants';
import { styleSheetRow } from './styles';

export type TableRowProps = {
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
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A table row that contains multiple cells. */
function TableRow({
  children,
  danger,
  info,
  muted,
  notice,
  success,
  warning,
  styleSheet,
  ...props
}: TableRowProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetRow);

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
