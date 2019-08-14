import { SortDirection, SortDirectionType } from 'react-virtualized';
import { GenericRow, SelectedRows } from '../types';

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

function sortList<T extends GenericRow>(
  list: T[],
  keys: string[],
  sortBy?: string,
  sortDirection?: SortDirectionType,
): T[] {
  if (sortBy && keys.includes(sortBy)) {
    if (sortDirection === SortDirection.ASC) {
      return list.slice().sort((a: T, b: T) => sortAsc(a.data[sortBy], b.data[sortBy]));
    }

    return list.slice().sort((a: T, b: T) => sortDesc(a.data[sortBy], b.data[sortBy]));
  }

  return list;
}

export default function sortData<T extends GenericRow>(
  list: T[],
  keys: string[],
  selectedRows: SelectedRows,
  selectedRowsFirst: boolean,
  sortBy?: string,
  sortDirection?: SortDirectionType,
): T[] {
  if (selectedRowsFirst) {
    const selectedList: T[] = [];
    const unselectedList: T[] = [];

    list.forEach((row: T) => {
      if (Object.prototype.hasOwnProperty.call(selectedRows, row.metadata.originalIndex)) {
        selectedList.push(row);
      } else {
        unselectedList.push(row);
      }
    });

    const sortedSelectedList = sortList(selectedList, keys, sortBy, sortDirection);
    const sortedUnselectedList = sortList(unselectedList, keys, sortBy, sortDirection);

    return sortedSelectedList.concat(sortedUnselectedList);
  }

  return sortList(list, keys, sortBy, sortDirection);
}
