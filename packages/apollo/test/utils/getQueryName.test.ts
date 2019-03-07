import gql from 'graphql-tag';
import getQueryName from '../../src/utils/getQueryName';

describe('getQueryName()', () => {
  it('returns a gql document name', () => {
    expect(
      getQueryName(gql`
        query getSomething {
          something {
            id
          }
        }
      `),
    ).toBe('getSomething');
  });

  it('returns "query" if no name found', () => {
    expect(
      getQueryName(gql`
        query {
          something {
            id
          }
        }
      `),
    ).toBe('query');
  });
});
