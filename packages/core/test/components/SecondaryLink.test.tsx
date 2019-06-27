import React from 'react';
import { shallow } from 'enzyme';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import SecondaryLink from '../../src/components/SecondaryLink';

describe('<SecondaryLink />', () => {
  it('renders a secondary link', () => {
    const wrapper = shallowWithStyles(shallow(<SecondaryLink>Link</SecondaryLink>).getElement());

    expect(wrapper).toMatchSnapshot();
  });
});
