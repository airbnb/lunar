import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import removeFromList from '../../src/updaters/removeFromList';

const QUERY = gql`
  query getSomething {
    something {
      id
      name
      things {
        id
        type
      }
    }
  }
`;

describe('removeFromList()', () => {
  let cache: InMemoryCache;

  beforeEach(() => {
    cache = new InMemoryCache();

    cache.writeQuery({
      query: QUERY,
      variables: { id: 123 },
      data: {
        something: {
          id: 123,
          name: 'Something',
          things: [
            { id: 1, type: 'A', __typename: 'thing' },
            { id: 2, type: 'B', __typename: 'thing' },
            { id: 3, type: 'C', __typename: 'thing' },
          ],
          __typename: 'something',
        },
      },
    });
  });

  it('errors if query does not exist in cache', () => {
    expect(() => {
      removeFromList(
        gql`
          query otherQuery {
            things {
              id
            }
          }
        `,
        'things',
        3,
      )(cache);
    }).toThrowErrorMatchingSnapshot();
  });

  it('errors if property name is not an array', () => {
    expect(() => {
      // Should be `something.things`
      removeFromList(QUERY, 'something.name', 3)(cache);
    }).toThrowErrorMatchingSnapshot();
  });

  it('removes item from list based on ID', () => {
    removeFromList(QUERY, 'something.things', 3)(cache);

    expect(cache.readQuery({ query: QUERY })).toEqual({
      something: {
        id: 123,
        name: 'Something',
        things: [
          { id: 1, type: 'A', __typename: 'thing' },
          { id: 2, type: 'B', __typename: 'thing' },
        ],
        __typename: 'something',
      },
    });
  });
});
