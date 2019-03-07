import gql from 'graphql-tag';
import prepareQuery from '../../src/utils/prepareQuery';

describe('prepareQuery()', () => {
  const query = gql`
    query getSomething {
      something {
        id
      }
    }
  `;

  it('returns a gql document wrapped', () => {
    expect(prepareQuery(query)).toEqual({ query });
  });

  it('returns a wrapped gql document as is', () => {
    expect(prepareQuery({ query })).toEqual({ query });
  });

  it('persists variables', () => {
    expect(prepareQuery({ query, variables: { id: 123 } })).toEqual({
      query,
      variables: { id: 123 },
    });
  });
});
