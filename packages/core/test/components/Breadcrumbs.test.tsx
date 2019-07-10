import React from 'react';
import { shallow } from 'enzyme';
import Breadcrumbs from '../../src/components/Breadcrumbs';
import Breadcrumb from '../../src/components/Breadcrumbs/Breadcrumb';

describe('<Breadcrumbs/>', () => {
  it('it renders a nav', () => {
    const wrapper = shallow(
      <Breadcrumbs accessibilityLabel="Breadcrumb">
        <Breadcrumb label="Label" />
      </Breadcrumbs>,
    );

    expect(wrapper.find('nav')).toHaveLength(1);
  });

  it('handles falsey breadcrumbs', () => {
    const wrapper = shallow(
      <Breadcrumbs accessibilityLabel="Breadcrumb">
        {false && <Breadcrumb label="One" />}
        {null && <Breadcrumb label="Two" />}
        <Breadcrumb label="Three" />
      </Breadcrumbs>,
    );

    expect(wrapper.find(Breadcrumb)).toHaveLength(1);
  });
});
