import { DocumentNode } from 'graphql';
import { get, set } from 'lodash/fp';
import { DataProxy, ApolloCache, StoreObject } from '@apollo/client';
import prepareQuery from '../utils/prepareQuery';
import getQueryName from '../utils/getQueryName';

export default function removeFromList<Result, Vars = {}>(
  docOrQuery: DocumentNode | DataProxy.Query<Vars, Result>,
  listPath: string,
  id: string | number,
  idName: string = 'id',
) {
  const query = prepareQuery<Result, Vars>(docOrQuery);

  return (cache: ApolloCache<Result>) => {
    const queryResult = cache.readQuery<Result>(query);
    const list = get(listPath, queryResult);

    if (typeof list === 'undefined' || !Array.isArray(list)) {
      if (__DEV__) {
        throw new TypeError(`"${getQueryName(query.query)}" list "${listPath}" is not an array.`);
      } else {
        return;
      }
    }

    const rootItem = listPath.split('.')[0];
    // @ts-ignore
    const resultRoot = queryResult[rootItem] as StoreObject;
    // Evict cache before writeQuery: https://github.com/apollographql/apollo-client/issues/6451
    cache.evict({
      id: cache.identify(resultRoot),
      broadcast: false,
    });

    const nextResult = set(
      listPath,
      list.filter((item) => (item as { [key: string]: unknown })[idName] !== id),
      { ...queryResult },
    );

    cache.writeQuery({
      ...query,
      data: nextResult,
    });
  };
}
