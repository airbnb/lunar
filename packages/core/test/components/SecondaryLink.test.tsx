import React from 'react';
import { shallow } from 'enzyme';
import SecondaryLink from '../../src/components/SecondaryLink';

describe('<SecondaryLink />', () => {
  it('renders a secondary link', () => {
    const wrapper = shallow(<SecondaryLink>Link</SecondaryLink>)
      .dive()
      .dive();

    expect(wrapper).toMatchSnapshot();
  });
});
