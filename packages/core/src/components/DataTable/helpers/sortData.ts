import { SortDirection, SortDirectionType } from 'react-virtualized';
import { IndexedParentRow, SelectedRows } from '../types';

function sortDesc(a: any, b: any) {
  if (typeof b === 'undefined' || a < b) {
    return 1;
  }

  return -1;
}

function sortAsc(a: any, b: any) {
  if (typeof b === 'undefined' || a < b) {
    return -1;
  }

  return 1;
}

export default function sortData(
  list: IndexedParentRow[],
  keys: string[],
  selectedRows: SelectedRows,
  selectedRowsFirst: boolean,
  sortBy?: string,
  sortDirection?: SortDirectionType,
): IndexedParentRow[] {
  if (selectedRowsFirst) {
    const selectedList = list.filter((row: IndexedParentRow) =>
      selectedRows.hasOwnProperty(row.metadata.originalIndex),
    );
    const sortedSelectedList = sortList(selectedList, keys, sortBy, sortDirection);

    const unselectedList = list.filter(
      (row: IndexedParentRow) => !selectedRows.hasOwnProperty(row.metadata.originalIndex),
    );

    const sortedUnselectedList = sortList(unselectedList, keys, sortBy, sortDirection);

    return sortedSelectedList.concat(sortedUnselectedList);
  }

  return sortList(list, keys, sortBy, sortDirection);
}

function sortList(
  list: IndexedParentRow[],
  keys: string[],
  sortBy?: string,
  sortDirection?: SortDirectionType,
): IndexedParentRow[] {
  if (sortBy && keys.includes(sortBy)) {
    if (sortDirection === SortDirection.ASC) {
      return list
        .slice()
        .sort((a: IndexedParentRow, b: IndexedParentRow) =>
          sortAsc(a.data[sortBy], b.data[sortBy]),
        );
    }

    return list
      .slice()
      .sort((a: IndexedParentRow, b: IndexedParentRow) => sortDesc(a.data[sortBy], b.data[sortBy]));
  }

  return list;
}
