import { DocumentNode } from 'graphql';

interface QueryCache<T> {
  query: DocumentNode;
  variables?: T;
}

export default class DocumentManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private queries: Map<string, QueryCache<any>> = new Map();

  readQuery<T>(key: string): QueryCache<T> | null {
    return this.queries.get(key) || null;
  }

  saveQuery<T>(key: string, query: DocumentNode, variables?: T): this {
    this.queries.set(key, {
      query,
      variables,
    });

    return this;
  }
}
