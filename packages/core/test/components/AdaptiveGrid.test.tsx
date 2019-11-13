import React from 'react';
import { mount } from 'enzyme';
import AdaptiveGrid from '../../src/components/AdaptiveGrid';

describe('<AdaptiveGrid />', () => {
  it('renders an AdaptiveGrid and passes props', () => {
    const wrapper = mount(
      <AdaptiveGrid noGutter breakpoints={{ 1200: 3 }} defaultItemsPerRow={2}>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
      </AdaptiveGrid>,
    );

    const breakpoints = wrapper.prop('breakpoints');
    const defaultItemsPerRow = wrapper.prop('defaultItemsPerRow');

    expect(breakpoints[1200]).toEqual(3);
    expect(defaultItemsPerRow).toEqual(2);
  });
});
