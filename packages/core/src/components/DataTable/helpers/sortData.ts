import { SortDirection, SortDirectionType } from 'react-virtualized';
import { GenericRow } from '../types';

// https://stackoverflow.com/questions/29829205/sort-an-array-so-that-null-values-always-come-last
function sort(a: any, b: any, ascending: boolean = false) {
  // Equal items sort equally.
  if (a === b) {
    return 0;
  }
  // null sort after anything else.
  /* eslint-disable no-eq-null */
  if (a == null) {
    return 1;
  }

  /* eslint-disable no-eq-null */
  if (b == null) {
    return -1;
  }
  if (ascending) {
    return a < b ? -1 : 1;
  }

  return a < b ? 1 : -1;
}

export default function sortData<T extends GenericRow>(
  list: T[],
  keys: string[],
  sortBy?: string,
  sortDirection?: SortDirectionType,
): T[] {
  if (sortBy && keys.includes(sortBy)) {
    if (sortDirection === SortDirection.ASC) {
      return list.slice().sort((a: T, b: T) => sort(a.data[sortBy], b.data[sortBy], true));
    }

    return list.slice().sort((a: T, b: T) => sort(a.data[sortBy], b.data[sortBy]));
  }

  return list;
}
