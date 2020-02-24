import React from 'react';
import { WithStylesProps } from '../../composers/withStyles';
import Text from '../Text';

export type Props = {
  /** Height of the TableHeader, falls back to RowHeight if not specified. */
  height: number;
  /** Label to display in the top left side. */
  tableHeaderLabel?: string;
  /** Width of the header. */
  width: number;
};

/** Header for the DataTable that displays a title. */
export function TableHeader({
  cx,
  height,
  styles,
  tableHeaderLabel,
  width,
}: Props & WithStylesProps) {
  const dimensionStyles: React.CSSProperties = {
    width,
    height,
  };

  const label = <Text bold>{tableHeaderLabel}</Text>;

  return (
    <div style={dimensionStyles}>
      <div className={cx(styles.tableHeader_inner)}>{label}</div>
    </div>
  );
}
