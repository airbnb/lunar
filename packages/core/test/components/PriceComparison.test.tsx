import React from 'react';
import { mount } from 'enzyme';
import PriceComparison from '../../src/components/PriceComparison';
import Empty from '../../src/components/Empty';

describe('<PriceComparison />', () => {
  it('render the amount in the currency', () => {
    const wrapper = mount(<PriceComparison amount={12300} currency="JPY" />);

    expect(wrapper.text()).toBe('¥12,300');
  });

  it('renders empty if invalid amount', () => {
    const wrapper = mount(<PriceComparison amount="[Hidden]" currency="JPY" />);

    expect(wrapper.find(Empty)).toHaveLength(1);
  });

  it('render the USD amount if no native amount passed', () => {
    const wrapper = mount(<PriceComparison amountUSD={123} currency="JPY" />);

    expect(wrapper.text()).toBe('$123.00');
  });

  it('renders empty if invalid amountUSD', () => {
    const wrapper = mount(<PriceComparison amountUSD="[Hidden]" currency="JPY" />);

    expect(wrapper.find(Empty)).toHaveLength(1);
  });

  it('render both native and USD amounts', () => {
    const wrapper = mount(<PriceComparison amount={12300} amountUSD={123} currency="JPY" />);

    expect(wrapper.text()).toBe('¥12,300, $123.00');
  });

  it('renders empty if invalid amount and amountUSD', () => {
    const wrapper = mount(
      <PriceComparison amount="[Hidden]" amountUSD="[Hidden]" currency="JPY" />,
    );

    expect(wrapper.find(Empty)).toHaveLength(1);
  });

  it('handles zeros accordingly', () => {
    const wrapper = mount(<PriceComparison amount={0} currency="JPY" />);

    expect(wrapper.text()).toBe('¥0');

    const wrapper2 = mount(<PriceComparison amountUSD={0} currency="JPY" />);

    expect(wrapper2.text()).toBe('$0.00');

    const wrapper3 = mount(<PriceComparison amount={0} amountUSD={0} currency="JPY" />);

    expect(wrapper3.text()).toBe('¥0, $0.00');
  });

  it('supports amount objects', () => {
    const wrapper = mount(
      <PriceComparison
        amount={{
          amount: 12300,
          amount_micros: 123000000,
          amount_formatted: '',
          currency: 'JPY',
          is_micros_accuracy: false,
        }}
        amountUSD={{
          amount: 123,
          amount_micros: 123000000,
          amount_formatted: '',
          currency: 'USD',
          is_micros_accuracy: true,
        }}
      />,
    );

    expect(wrapper.text()).toBe('¥12,300, $123.00');
  });
});
