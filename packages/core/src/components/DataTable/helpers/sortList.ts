import { SortDirection, SortDirectionType } from 'react-virtualized';
import { GenericRow } from '../types';

function sortAsc(a: any, b: any) {
  if (typeof b === 'undefined' || a < b) {
    return 1;
  }

  return -1;
}

function sortDesc(a: any, b: any) {
  if (typeof b === 'undefined' || a < b) {
    return -1;
  }

  return 1;
}

export default function sortList<T extends GenericRow>(
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
