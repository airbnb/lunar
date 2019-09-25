import { DocumentNode } from 'graphql';
import { DataProxy } from 'apollo-cache';

export default function prepareQuery<Vars = {}>(
  docOrQuery: DocumentNode | DataProxy.Query<Vars>,
): DataProxy.Query<Vars> {
  const query = docOrQuery;

  if ((query as DocumentNode).kind) {
    return { query } as DataProxy.Query<Vars>;
  }

  return query as DataProxy.Query<Vars>;
}
