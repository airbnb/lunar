import { DocumentNode } from 'graphql';
import { get, set } from 'lodash/fp';
import { DataProxy, MutationResult } from '@apollo/client';
import prepareQuery from '../utils/prepareQuery';
import getQueryName from '../utils/getQueryName';

export default function addToList<Result, Vars = {}>(
  docOrQuery: DocumentNode | DataProxy.Query<Vars, Result>,
  listPath: string,
  mutationPath: string,
) {
  const query = prepareQuery<Result, Vars>(docOrQuery);

  return (cache: DataProxy, mutationResult: MutationResult<Result>) => {
    const queryResult = cache.readQuery<Result>(query);
    const list = get(listPath, queryResult);

    if (typeof list === 'undefined' || !Array.isArray(list)) {
      if (__DEV__) {
        throw new TypeError(`"${getQueryName(query.query)}" list "${listPath}" is not an array.`);
      } else {
        return;
      }
    }

    const data = get(mutationPath, mutationResult);

    if (typeof data === 'undefined') {
      if (__DEV__) {
        throw new Error(`Cannot find mutation "${mutationPath}". Unable to update query list.`);
      } else {
        return;
      }
    }

    const nextResult = set(listPath, [...list, data], { ...queryResult });

    cache.writeQuery({
      ...query,
      data: nextResult,
    });
  };
}
