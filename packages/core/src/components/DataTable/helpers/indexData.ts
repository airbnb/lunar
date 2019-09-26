import memoize from 'lodash/memoize';
import { ChildRow, IndexedChildRow, IndexedParentRow, ParentRow } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const indexData = memoize((dataList: ParentRow[]): IndexedParentRow[] => {
  const indexedDataList: IndexedParentRow[] = [];

  dataList.forEach((row: ParentRow, idx: number) => {
    const children: IndexedChildRow[] = [];

    if (row.metadata && row.metadata.children && row.metadata.children.length > 0) {
      row.metadata.children.forEach((child: ChildRow, childIdx: number) => {
        children.push({
          ...child,
          metadata: {
            ...child.metadata,
            originalIndex: childIdx,
            isChild: true,
          },
        });
      });
    }

    indexedDataList.push({
      ...row,
      metadata: {
        ...row.metadata,
        children,
        originalIndex: idx,
        isChild: false,
      },
    });
  });

  return indexedDataList;
});
