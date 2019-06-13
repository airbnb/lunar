import React from 'react';
import { Column } from 'react-virtualized';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';
import IconChevronDown from '@airbnb/lunar-icons/lib/interface/IconChevronDown';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import Spacing from '../../Spacing';
import { WithStylesProps } from '../../../composers/withStyles';
import { TableRow } from '../types';
import { EXPANDABLE_COLUMN_WIDTH } from '../constants';
import DirectionalIcon from '../../DirectionalIcon';

export default function renderExpandableColumn(
  cx: WithStylesProps['cx'],
  styles: WithStylesProps['styles'],
  expandedRows: Set<number>,
  expandRow: (newExpandedRowIndex: number) => (event: any) => void,
) {
  const cellRenderer = (row: TableRow) => {
    const { children, originalIndex } = row.rowData.metadata;

    if (children && children.length > 0) {
      const icon = expandedRows.has(originalIndex) ? (
        <IconChevronDown size="1.6em" decorative />
      ) : (
        <DirectionalIcon
          direction="right"
          left={IconChevronLeft}
          right={IconChevronRight}
          size="1.6em"
          decorative
        />
      );

      return (
        <div
          className={cx(styles.expand_caret)}
          role="button"
          tabIndex={0}
          onClick={expandRow(originalIndex)}
          onKeyPress={expandRow(originalIndex)}
        >
          <Spacing left={1.5}>{icon}</Spacing>
        </div>
      );
    }

    return <div className={cx(styles.row)} />;
  };

  return <Column dataKey="expanded" cellRenderer={cellRenderer} width={EXPANDABLE_COLUMN_WIDTH} />;
}
