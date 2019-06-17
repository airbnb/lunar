import React from 'react';
import { shallow } from 'enzyme';
import DynamicGrid from '../../src/components/DynamicGrid';

describe('<DynamicGrid />', () => {
  it('renders an DynamicGrid with items inside', () => {
    const wrapper = shallow(
      <DynamicGrid>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
      </DynamicGrid>,
    ).dive();

    expect(wrapper.children()).toHaveLength(3);
  });
  it('renders an DynamicGrid with full width items', () => {
    const wrapper = shallow(
      <DynamicGrid>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
      </DynamicGrid>,
    ).dive();

    expect(wrapper.childAt(0).prop('style').width).toBe('100%');
  });
  it('renders an DynamicGrid with breakpoints', () => {
    // @ts-ignore
    window.innerWidth = 2000;
    window.dispatchEvent(new Event('resize'));

    const wrapper = shallow(
      <DynamicGrid breakpoints={{ 1200: 4 }}>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
      </DynamicGrid>,
    ).dive();

    expect(wrapper.childAt(0).prop('style').width).toBe('25%');
  });
  it('renders an DynamicGrid with 4 items per row', () => {
    const wrapper = shallow(
      <DynamicGrid defaultItems={4}>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
      </DynamicGrid>,
    ).dive();

    expect(wrapper.childAt(0).prop('style').width).toBe('25%');
  });
});
