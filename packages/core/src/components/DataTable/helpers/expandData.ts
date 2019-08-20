import { SortDirectionType } from 'react-virtualized';
import sortData from './sortData';
import { SelectedRows, IndexedParentRow, IndexedChildRow, ExpandedRow } from '../types';

/*  Iterate over the sortedDataList in state to flatten out children stashed in metadata */
export default function expandData(
  sortedData: IndexedParentRow[],
  expandedRows: Set<number>,
  selectedRows: SelectedRows,
  selectedRowsFirst: boolean,
  sortBy: string,
  keys: string[],
  sortDirection?: SortDirectionType,
) {
  const expandedData: ExpandedRow[] = [];
  sortedData.forEach((row: IndexedParentRow, idx: number) => {
    expandedData.push({
      ...row,
      metadata: {
        ...row.metadata,
        preExpandedIndex: idx,
      },
    });
    if (row.metadata.originalIndex !== undefined && expandedRows.has(row.metadata.originalIndex)) {
      const children = sortData(
        row.metadata.children,
        keys,
        selectedRows,
        selectedRowsFirst,
        sortBy,
        sortDirection,
      );
      children.forEach((child: IndexedChildRow) => {
        expandedData.push({
          ...child,
          metadata: {
            ...child.metadata,
            parentIndex: idx,
            parentOriginalIndex: row.metadata.originalIndex,
          },
        });
      });
    }
  });

  return expandedData;
}
