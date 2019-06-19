import React from 'react';
import { shallow } from 'enzyme';
import AdaptiveGrid from '../../lib/components/AdaptiveGrid';

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
  it('renders an AdaptiveGrid with full width items', () => {
    const wrapper = shallow(
      <AdaptiveGrid>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
      </AdaptiveGrid>,
    ).dive();

    expect(wrapper.childAt(0).prop('style').width).toBe('100%');
  });
  it('renders an AdaptiveGrid with breakpoints', () => {
    // @ts-ignore
    window.innerWidth = 2000;
    window.dispatchEvent(new Event('resize'));

    const wrapper = shallow(
      <AdaptiveGrid breakpoints={{ 1200: 4 }}>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
      </AdaptiveGrid>,
    ).dive();

    expect(wrapper.childAt(0).prop('style').width).toBe('25%');
  });
  it('renders an AdaptiveGrid with 4 items per row', () => {
    const wrapper = shallow(
      <AdaptiveGrid defaultItems={4}>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
      </AdaptiveGrid>,
    ).dive();

    expect(wrapper.childAt(0).prop('style').width).toBe('25%');
  });
});
