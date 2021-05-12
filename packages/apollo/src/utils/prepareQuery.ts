import { DocumentNode } from 'graphql';
import { DataProxy } from '@apollo/client';

export default function prepareQuery<Result, Vars = {}>(
  docOrQuery: DocumentNode | DataProxy.Query<Vars, Result>,
): DataProxy.Query<Vars, Result> {
  const query = docOrQuery;

  if ((query as DocumentNode).kind) {
    return { query } as DataProxy.Query<Vars, Result>;
  }

  return query as DataProxy.Query<Vars, Result>;
}
