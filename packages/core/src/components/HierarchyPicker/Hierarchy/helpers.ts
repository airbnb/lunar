import { ItemShape } from '../types';

export function allChildrenReadonly(parent: ItemShape): boolean {
  const children = parent.items || [];

  return children.length > 0
    ? children.reduce((acc: boolean, item: ItemShape) => acc && allChildrenReadonly(item), true)
    : !!parent.readonly;
}

/** remove readonly parents that only contain readonly children */
export function readonlyReducer(acc: ItemShape[], item: ItemShape): ItemShape[] {
  if (!(item.readonly && allChildrenReadonly(item))) {
    // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
    const children = (item.items || []).reduce(readonlyReducer, []);

    acc.push({
      ...item,
      items: children.length > 0 ? children : null,
    });
  }

  return acc;
}
