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

  it('renders the expected number of Term items horizontally', () => {
    const wrapper = shallowWithStyles(
      <TermList horizontal>
        <Term label="label">Data</Term>
        <Term label="label">Data</Term>
        <Term label="label">Data</Term>
      </TermList>,
    );

    expect(wrapper.find(Term)).toHaveLength(3);
  });

  it('renders the expected number of Terms with different props', () => {
    const wrapper = shallowWithStyles(
      <TermList horizontal>
        <Term regular label="label">
          Data
        </Term>
        <Term uppercased label="label">
          Data
        </Term>
        <Term endAlign label="label">
          Data
        </Term>
      </TermList>,
    );

    expect(wrapper.find(Term)).toHaveLength(3);
  });

  it('renders the expected number of detail Links', () => {
    const wrapper = shallowWithStyles(
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
      </Term>,
    );

    expect(wrapper.find(Link)).toHaveLength(2);
  });
});
