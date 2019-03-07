import React from 'react';
import { shallow } from 'enzyme';
import MutedButton from '../../src/components/MutedButton';

describe('<MutedButton />', () => {
  it('renders a secondary button', () => {
    const wrapper = shallow(<MutedButton>Button</MutedButton>)
      .dive()
      .dive();

    expect(wrapper).toMatchSnapshot();
  });
});
