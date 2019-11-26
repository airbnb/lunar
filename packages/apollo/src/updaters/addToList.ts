import { DocumentNode } from 'graphql';
import get from 'lodash/get';
import set from 'lodash/set';
import { MutationUpdaterFn } from 'apollo-client';
import prepareQuery from '../utils/prepareQuery';
import getQueryName from '../utils/getQueryName';

export default function addToList<Result = {}>(
  docOrQuery: DocumentNode,
  listPath: string,
  mutationPath: string,
): MutationUpdaterFn {
  const query = prepareQuery(docOrQuery);

  return (cache, result) => {
    const queryResult = cache.readQuery<Result>(query);
    const nextResult = { ...queryResult };
    const list = get(queryResult, listPath);

    if (typeof list === 'undefined' || !Array.isArray(list)) {
      if (__DEV__) {
        throw new TypeError(`"${getQueryName(query.query)}" list "${listPath}" is not an array.`);
      } else {
        return;
      }
    }

    const data = get(result.data, mutationPath);

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
