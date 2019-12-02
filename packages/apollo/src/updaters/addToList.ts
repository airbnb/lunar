import { DocumentNode } from 'graphql';
import get from 'lodash/get';
import set from 'lodash/set';
import { MutationUpdaterFn } from 'apollo-client';
import { DataProxy } from 'apollo-cache';
import prepareQuery from '../utils/prepareQuery';
import getQueryName from '../utils/getQueryName';

export default function addToList(
  docOrQuery: string | DocumentNode | DataProxy.Query<{}>,
  listPath: string,
  mutationPath: string,
): MutationUpdaterFn {
  const query = prepareQuery(docOrQuery);

  return (cache, mutationResult) => {
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

    const data = get(mutationResult.data, mutationPath);

    if (typeof data === 'undefined') {
      if (__DEV__) {
        throw new Error(`Cannot find mutation "${mutationPath}". Unable to update query list.`);
      } else {
        return;
      }
    }

    set(nextResult, listPath, [...list, data]);

    cache.writeQuery({
      ...query,
      data: nextResult,
    });
  };
}
