import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import addToList from '../../src/updaters/addToList';

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

describe('addToList()', () => {
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
          ],
          __typename: 'something',
        },
      },
    });
  });

  it('errors if query does not exist in cache', () => {
    expect(() => {
      addToList(
        gql`
          query otherQuery {
            things {
              id
            }
          }
        `,
        'something.things',
        'updateThing',
      )(cache, {});
    }).toThrowErrorMatchingSnapshot();
  });

  it('errors if property name is not an array', () => {
    expect(() => {
      // Should be `something.things`
      addToList(QUERY, 'something.name', 'updateThing')(cache, {});
    }).toThrowErrorMatchingSnapshot();
  });

  it('errors if mutation data does not exist', () => {
    expect(() => {
      addToList(QUERY, 'something.things', 'updateThing')(cache, {});
    }).toThrowErrorMatchingSnapshot();
  });

  it('adds mutation data to the querys list', () => {
    addToList(
      QUERY,
      'something.things',
      'updateThing',
    )(cache, {
      data: {
        updateThing: {
          id: 3,
          type: 'C',
          __typename: 'thing',
        },
      },
    });

    expect(cache.readQuery({ query: QUERY })).toEqual({
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
    });
  });
});
