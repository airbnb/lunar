import React from 'react';
import Text from '../Text';
import { styleSheetTableHeader } from './styles';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

export type Props = {
  /** Height of the TableHeader, falls back to RowHeight if not specified. */
  height: number;
  /** Label to display in the top left side. */
  tableHeaderLabel?: string;
  /** Width of the header. */
  width: number;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** Header for the DataTable that displays a title. */
export default function TableHeader({ height, tableHeaderLabel, width, styleSheet }: Props) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetTableHeader);

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
