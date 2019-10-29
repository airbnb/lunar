import { SortDirection, SortDirectionType } from 'react-virtualized';
import { GenericRow, SelectedRows, SortByValueAccessor } from '../types';

// https://stackoverflow.com/questions/29829205/sort-an-array-so-that-null-values-always-come-last
function sort(a: unknown, b: unknown, ascending: boolean = false) {
  // Equal items sort equally.
  if (a === b) {
    return 0;
  }

  // Null sort after anything else.
  if (a == null) {
    return 1;
  }

  if (b == null) {
    return -1;
  }

  if (ascending) {
    // @ts-ignore
    return a < b ? -1 : 1;
  }

  // @ts-ignore
  return a < b ? 1 : -1;
}

function defaultSortValueAccessor<T extends GenericRow>(d: T, sortByKey: string) {
  return d.data[sortByKey];
}

function sortList<T extends GenericRow>(
  list: T[],
  keys: string[],
  sortBy?: string,
  sortDirection?: SortDirectionType,
  sortByValue: SortByValueAccessor<T> = defaultSortValueAccessor,
): T[] {
  if (sortBy && keys.includes(sortBy)) {
    if (sortDirection === SortDirection.ASC) {
      return [...list].sort((a: T, b: T) =>
        sort(sortByValue(a, sortBy), sortByValue(b, sortBy), true),
      );
    }

    return [...list].sort((a: T, b: T) => sort(sortByValue(a, sortBy), sortByValue(b, sortBy)));
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
  sortByValue?: SortByValueAccessor<T>,
): T[] {
  if (selectedRowsFirst) {
    const selectedList: T[] = [];
    const unselectedList: T[] = [];

    list.forEach((row: T) => {
      if (
        Object.prototype.hasOwnProperty.call(selectedRows, row.metadata.originalIndex as number)
      ) {
        selectedList.push(row);
      } else {
        unselectedList.push(row);
      }
    });

    const sortedSelectedList = sortList(selectedList, keys, sortBy, sortDirection, sortByValue);
    const sortedUnselectedList = sortList(unselectedList, keys, sortBy, sortDirection, sortByValue);

    return sortedSelectedList.concat(sortedUnselectedList);
  }

  return sortList(list, keys, sortBy, sortDirection, sortByValue);
}
