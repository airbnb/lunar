import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import Breadcrumbs from '../../src/components/Breadcrumbs';
import Breadcrumb from '../../src/components/Breadcrumbs/Breadcrumb';

function unwrap(element: any): Enzyme.ShallowWrapper {
  return unwrapHOCs(shallow(element), 'Breadcrumbs', {}, { render: true });
}

describe('<Breadcrumbs/>', () => {
  it('errors if non-breadcrumb children are passed', () => {
    expect(() =>
      unwrap(<Breadcrumbs accessibilityLabel="Breadcrumb">Foo</Breadcrumbs>),
    ).toThrowError();
  });

  it('it renders a nav', () => {
    const wrapper = unwrap(
      <Breadcrumbs accessibilityLabel="Breadcrumb">
        <Breadcrumb label="Label" />
      </Breadcrumbs>,
    );

    expect(wrapper.find('nav')).toHaveLength(1);
  });

  it('handles falsey breadcrumbs', () => {
    const wrapper = unwrap(
      <Breadcrumbs accessibilityLabel="Breadcrumb">
        {false && <Breadcrumb label="One" />}
        {null && <Breadcrumb label="Two" />}
        <Breadcrumb label="Three" />
      </Breadcrumbs>,
    );

    expect(wrapper.find(Breadcrumb)).toHaveLength(1);
  });
});
