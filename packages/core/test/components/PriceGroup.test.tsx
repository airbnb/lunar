import React from 'react';
import { mount } from 'enzyme';
import PriceGroup from '../../src/components/PriceGroup';

describe('<PriceGroup />', () => {
  it('render a single amount', () => {
    const wrapper = mount(<PriceGroup amounts={{ GBP: 123 }} />);

    expect(wrapper.text()).toBe('£123.00');
  });

  it('render multiple amounts', () => {
    const wrapper = mount(<PriceGroup amounts={{ GBP: 123, JPY: 456 }} />);

    expect(wrapper.text()).toBe('£123.00, ¥456');
  });

  it('render multiple amounts but place USD last', () => {
    const wrapper = mount(<PriceGroup amounts={{ GBP: 123, JPY: 456, USD: 789, ZAR: 1011 }} />);

    expect(wrapper.text()).toMatch(/£123\.00, ¥456, ZAR\s*1,011\.00, \$789\.00/);
  });

  it('changes the display and rounding', () => {
    const wrapper = mount(
      <PriceGroup round amounts={{ GBP: 123.45, JPY: 456.93 }} display="code" />,
    );

    expect(wrapper.text()).toMatch(/GBP\s*123\.00, JPY\s*457/);
  });

  it('changes the divider', () => {
    const wrapper = mount(<PriceGroup amounts={{ GBP: 123, JPY: 456 }} divider=" ~ " />);

    expect(wrapper.text()).toBe('£123.00 ~ ¥456');
  });

  it('divides the amount when using micros', () => {
    const wrapper = mount(<PriceGroup micros amounts={{ GBP: 123000000, JPY: 456000000 }} />);

    expect(wrapper.text()).toBe('£123.00, ¥456');
  });

  it('supports amount objects', () => {
    const wrapper = mount(
      <PriceGroup
        amounts={{
          GBP: {
            amount: 123,
            amount_micros: 123000000,
            amount_formatted: '',
            currency: 'GBP',
            is_micros_accuracy: false,
          },
          JPY: {
            amount: 456,
            amount_micros: 456000000,
            amount_formatted: '',
            currency: 'JPY',
            is_micros_accuracy: true,
          },
        }}
      />,
    );

    expect(wrapper.text()).toBe('£123.00, ¥456');
  });
});
