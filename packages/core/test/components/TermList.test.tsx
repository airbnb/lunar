import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import TermList, { Term } from '../../src/components/TermList';
import Link from '../../src/components/Link';

describe('<TermList />', () => {
  it('renders the expected number of Term items', () => {
    const wrapper = shallowWithStyles(
      <TermList>
        <Term label="label">Data</Term>
        <Term label="label">Data</Term>
        <Term label="label">Data</Term>
      </TermList>,
    );

    expect(wrapper.find(Term)).toHaveLength(3);
  });

  it('renders the expected number of detail Links', () => {
    const wrapper = shallowWithStyles(
      <TermList>
        <Term
          label="Clusters"
          after={
            <>
              <Link small>Details</Link>
              <Link small>Git</Link>
            </>
          }
        >
          8
        </Term>
      </TermList>,
    )
      .find('Term')
      .dive();

    expect(wrapper.find(Link)).toHaveLength(2);
  });

  it('renders the expected number of detail Links with end alignment', () => {
    const wrapper = shallowWithStyles(
      <TermList>
        <Term
          endAlign
          label="Clusters"
          after={
            <>
              <Link small>Details</Link>
              <Link small>Git</Link>
            </>
          }
        >
          8
        </Term>
      </TermList>,
    )
      .find('Term')
      .dive()
      .find('dt')
      .childAt(0)
      .dive()
      .dive();

    expect(wrapper.find(Link)).toHaveLength(2);
  });
});
