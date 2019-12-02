import { DocumentNode } from 'graphql';
import get from 'lodash/get';
import set from 'lodash/set';
import { MutationUpdaterFn } from 'apollo-client';
import { DataProxy } from 'apollo-cache';
import prepareQuery from '../utils/prepareQuery';
import getQueryName from '../utils/getQueryName';

export default function removeFromList(
  docOrQuery: string | DocumentNode | DataProxy.Query<{}>,
  listPath: string,
  id: string | number,
  idName: string = 'id',
): MutationUpdaterFn {
  const query = prepareQuery(docOrQuery);

  return cache => {
    const queryResult = cache.readQuery<object>(query);
    const nextResult = { ...queryResult };
    const list = get(queryResult, listPath);

    if (typeof list === 'undefined' || !Array.isArray(list)) {
      if (__DEV__) {
        throw new TypeError(`"${getQueryName(query.query)}" list "${listPath}" is not an array.`);
      } else {
        return;
      }
    }

    set(
      nextResult,
      listPath,
      list.filter(item => item[idName] !== id),
    );

    cache.writeQuery({
      ...query,
      data: nextResult,
    });
  };
}
