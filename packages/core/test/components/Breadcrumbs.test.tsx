import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Breadcrumbs from '../../src/components/Breadcrumbs';
import Breadcrumb from '../../src/components/Breadcrumbs/Breadcrumb';

describe('<Breadcrumbs/>', () => {
  it('errors if non-breadcrumb children are passed', () => {
    expect(() =>
      shallowWithStyles(<Breadcrumbs accessibilityLabel="Breadcrumb">Foo</Breadcrumbs>),
    ).toThrowError();
  });

  it('it renders a nav', () => {
    const wrapper = shallowWithStyles(
      <Breadcrumbs accessibilityLabel="Breadcrumb">
        <Breadcrumb label="Label" />
      </Breadcrumbs>,
    );

    expect(wrapper.find('nav')).toHaveLength(1);
  });

  it('handles falsey breadcrumbs', () => {
    const wrapper = shallowWithStyles(
      <Breadcrumbs accessibilityLabel="Breadcrumb">
        {false && <Breadcrumb label="One" />}
        {null && <Breadcrumb label="Two" />}
        <Breadcrumb label="Three" />
      </Breadcrumbs>,
    );

    expect(wrapper.find(Breadcrumb)).toHaveLength(1);
  });
});
