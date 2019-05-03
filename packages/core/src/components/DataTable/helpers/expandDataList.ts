import { SortDirectionType } from 'react-virtualized';
import sortList from './sortList';
import { IndexedParentRow, IndexedChildRow, ExpandedRow } from '../types';

/*  Iterate over the sortedDataList in state to flatten out children stashed in metadata */
export default function expandDataList(
  sortedDataList: IndexedParentRow[],
  expandedRows: Set<number>,
  sortBy: string,
  keys: string[],
  sortDirection?: SortDirectionType,
) {
  const expandedDataList: ExpandedRow[] = [];
  sortedDataList.forEach((row: IndexedParentRow, idx: number) => {
    expandedDataList.push({
      ...row,
      metadata: {
        ...row.metadata,
        preExpandedIndex: idx,
      },
    });
    if (row.metadata.originalIndex && expandedRows.has(row.metadata.originalIndex)) {
      const children = sortList(row.metadata.children, keys, sortBy, sortDirection);
      children.forEach((child: IndexedChildRow) => {
        expandedDataList.push({
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

  return expandedDataList;
}
