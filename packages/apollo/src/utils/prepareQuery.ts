import { DocumentNode } from 'graphql';
import { DataProxy } from 'apollo-cache';
import Apollo from '..';

export default function prepareQuery<Vars = {}>(
  docOrQuery: string | DocumentNode | DataProxy.Query<Vars>,
): DataProxy.Query<Vars> {
  const query = docOrQuery;

  if (typeof query === 'string') {
    const cache = Apollo.getDocumentManager().readQuery<Vars>(query);

    if (cache) {
      return cache;
    }
  }

  if ((query as DocumentNode).kind) {
    return { query } as DataProxy.Query<Vars>;
  }

  return query as DataProxy.Query<Vars>;
}
