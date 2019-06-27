import React from 'react';
import { Column } from 'react-virtualized';
import Spacing from '../../Spacing';
import ExpandableIcon from '../../ExpandableIcon';
import { WithStylesProps } from '../../../composers/withStyles';
import { EXPANDABLE_COLUMN_WIDTH } from '../constants';
import { TableRow } from '../types';

export default function renderExpandableColumn(
  cx: WithStylesProps['cx'],
  styles: WithStylesProps['styles'],
  expandedRows: Set<number>,
  expandRow: (newExpandedRowIndex: number) => (event: any) => void,
) {
  const cellRenderer = (row: TableRow) => {
    const { children, originalIndex } = row.rowData.metadata;

    if (children && children.length > 0) {
      return (
        <div
          className={cx(styles.expand_caret)}
          role="button"
          tabIndex={0}
          onClick={expandRow(originalIndex)}
          onKeyPress={expandRow(originalIndex)}
        >
          <Spacing left={1.5}>
            <ExpandableIcon expanded={expandedRows.has(originalIndex)} size="1.6em" />
          </Spacing>
        </div>
      );
    }

    return <div className={cx(styles.row)} />;
  };

  return <Column dataKey="expanded" cellRenderer={cellRenderer} width={EXPANDABLE_COLUMN_WIDTH} />;
}
