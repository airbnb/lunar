import React from 'react';
import { Column } from 'react-virtualized';

import IconChevronDown from '@airbnb/lunar-icons/lib/interface/IconChevronDown';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import Spacing from '../../Spacing';
import { css, WithStylesProps } from '../../../composers/withStyles';
import { TableRow } from '../types';
import { EXPANDABLE_COLUMN_WIDTH } from '../constants';

export default function renderExpandableColumn(
  styles: WithStylesProps['styles'],
  expandedRows: Set<number>,
  expandRow: (newExpandedRowIndex: number) => (event: any) => void,
) {
  const cellRenderer = (row: TableRow) => {
    const { children, originalIndex } = row.rowData.metadata;

    if (children && children.length > 0) {
      const Chevron = expandedRows.has(originalIndex) ? IconChevronDown : IconChevronRight;

      return (
        <div
          {...css(styles.expand_caret)}
          role="button"
          tabIndex={0}
          onClick={expandRow(originalIndex)}
          onKeyPress={expandRow(originalIndex)}
        >
          <Spacing left={1.5}>
            <Chevron decorative size="1.6em" />
          </Spacing>
        </div>
      );
    }

    return <div {...css(styles.row)} />;
  };

  return <Column dataKey="expanded" cellRenderer={cellRenderer} width={EXPANDABLE_COLUMN_WIDTH} />;
}
