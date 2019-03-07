import React from 'react';
import { shallow } from 'enzyme';
import DangerButton from '../../src/components/DangerButton';

describe('<DangerButton />', () => {
  it('renders a primary button', () => {
    const wrapper = shallow(<DangerButton>Button</DangerButton>)
      .dive()
      .dive();

    expect(wrapper).toMatchSnapshot();
  });
});
