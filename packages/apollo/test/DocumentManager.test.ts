import gql from 'graphql-tag';
import DocumentManager from '../src/DocumentManager';

describe('DocumentManager', () => {
  let manager: DocumentManager;

  beforeEach(() => {
    manager = new DocumentManager();
  });

  it('can save and read a query', () => {
    const query = gql`
      query {
        foo {
          id
        }
      }
    `;

    manager.saveQuery('unique-key', query, { id: 123 });

    expect(manager.readQuery('unique-key')).toEqual({
      query,
      variables: { id: 123 },
    });
  });

  it('returns null for unknown key', () => {
    expect(manager.readQuery('unique-key')).toBeNull();
  });
});
