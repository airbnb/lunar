import React from 'react';
import { shallow } from 'enzyme';
import Text from '../../src/components/Text';
import Empty from '../../src/components/Empty';

describe('<Empty />', () => {
  it('renders a dash', () => {
    const wrapper = shallow(<Empty />);

    expect(wrapper.find(Text).prop('children')).toBe('—');
  });
});
