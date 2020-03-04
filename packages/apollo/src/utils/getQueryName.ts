import { DocumentNode, TypeDefinitionNode } from 'graphql';

export default function getQueryName(query: DocumentNode): string {
  if (query.definitions.length > 0) {
    const def = query.definitions[0] as TypeDefinitionNode;

    return def?.name?.value || 'query';
  }

  // istanbul ignore next
  return query?.loc?.source?.name || 'query';
}
