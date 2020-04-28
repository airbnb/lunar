import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import FormField from '../../src/components/FormField';
import Range from '../../src/components/Range';
import BaseRange from '../../src/components/Range/BaseRange';
import Text from '../../src/components/Text';

const getInput = (wrapper: ShallowWrapper) => wrapper.find(BaseRange).dive().dive().find('input');

describe('<Range />', () => {
  it('renders a field and range input', () => {
    const wrapper = shallow(<Range name="foo" label="Label" onChange={() => {}} />);
    const input = getInput(wrapper);

    expect(wrapper.find(FormField)).toHaveLength(1);
    expect(input).toHaveLength(1);
    expect(input.prop('type')).toBe('range');
  });

  it('sets an id', () => {
    const wrapper = shallow(<Range name="foo" label="Label" onChange={() => {}} />);
    const input = getInput(wrapper);

    expect(wrapper.find(FormField).prop('id')).toBeDefined();
    expect(input.prop('id')).toBeDefined();
  });

  it('supports disabled', () => {
    const wrapper = shallow(<Range disabled name="foo" label="Label" onChange={() => {}} />);
    expect(getInput(wrapper).prop('disabled')).toBe(true);
  });

  it('sets min, max, and step', () => {
    const wrapper = shallow(
      <Range min={-5} max={15} step={5} name="foo" label="Label" onChange={() => {}} />,
    );
    const input = getInput(wrapper);

    expect(input.prop('min')).toBe('-5');
    expect(input.prop('max')).toBe('15');
    expect(input.prop('step')).toBe('5');
  });

  it('renders a tooltip with value', () => {
    const wrapper = shallow(
      <Range alwaysShowTooltip value={7} name="foo" label="Label" onChange={() => {}} />,
    );
    const tooltip = wrapper.find(BaseRange).dive().dive().find('div[role="tooltip"]');

    expect(tooltip).toHaveLength(1);
    expect(tooltip.find(Text).dive().text()).toBe('7');
  });

  it('renders annotations', () => {
    const wrapper = shallow(
      <Range
        annotations={[{ value: 50, label: 'fity' }]}
        name="foo"
        label="Label"
        onChange={() => {}}
      />,
    );

    expect(wrapper.find(BaseRange).dive().dive().find('div').last().text()).toBe('fity');
  });
});
