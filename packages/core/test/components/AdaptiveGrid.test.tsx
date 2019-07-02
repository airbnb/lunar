import React from 'react';
import { shallow } from 'enzyme';
import AdaptiveGrid from '../../src/components/AdaptiveGrid';

describe('<AdaptiveGrid />', () => {
  it('renders an AdaptiveGrid with items inside', () => {
    const wrapper = shallow(
      <AdaptiveGrid>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
      </AdaptiveGrid>,
    ).dive();

    expect(wrapper.children()).toHaveLength(3);
  });
});
