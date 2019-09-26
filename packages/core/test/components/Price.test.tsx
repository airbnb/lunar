import React from 'react';
import { shallow } from 'enzyme';
import Price from '../../src/components/Price';
import Empty from '../../src/components/Empty';

describe('<Price />', () => {
  describe('numeric amount', () => {
    it('renders empty if no amount', () => {
      const wrapper = shallow(<Price currency="USD" />);

      expect(wrapper.find(Empty)).toHaveLength(1);
    });

    it('render the amount in the currency', () => {
      const wrapper = shallow(<Price amount={12300} currency="JPY" />);

      expect(wrapper.text()).toBe('¥12,300');
    });

    it('rounds the amount', () => {
      const wrapper = shallow(<Price round amount={53120.78} currency="USD" />);

      expect(wrapper.text()).toBe('$53,121.00');
    });

    it('trims trailing zeros', () => {
      const wrapper = shallow(<Price trimTrailingZeros amount={53120} currency="USD" />);

      expect(wrapper.text()).toBe('$53,120');
    });

    it('divides the amount when using micros', () => {
      const wrapper = shallow(<Price round micros amount={792000000} currency="USD" />);

      expect(wrapper.text()).toBe('$792.00');
    });

    it('can customize the display', () => {
      const wrapper = shallow(<Price amount={12300} currency="JPY" />);

      expect(wrapper.text()).toBe('¥12,300');

      wrapper.setProps({
        display: 'code',
      });

      expect(wrapper.text()).toMatch(/JPY\s*12,300/);

      wrapper.setProps({
        display: 'name',
      });

      expect(wrapper.text()).toBe('12,300 Japanese yen');
    });
  });

  describe('amount object', () => {
    it('renders empty if no amount', () => {
      const wrapper = shallow(<Price />);

      expect(wrapper.find(Empty)).toHaveLength(1);
    });

    it('render the amount in the currency', () => {
      const wrapper = shallow(
        <Price
          amount={{
            amount: 12300,
            amount_micros: 123000000,
            amount_formatted: '',
            currency: 'JPY',
            is_micros_accuracy: false,
          }}
        />,
      );

      expect(wrapper.text()).toBe('¥12,300');
    });

    it('rounds the amount', () => {
      const wrapper = shallow(
        <Price
          round
          amount={{
            amount: 53120.78,
            amount_micros: 53120000000,
            amount_formatted: '',
            currency: 'USD',
            is_micros_accuracy: false,
          }}
        />,
      );

      expect(wrapper.text()).toBe('$53,121.00');
    });

    it('trims trailing zeros', () => {
      const wrapper = shallow(
        <Price
          trimTrailingZeros
          amount={{
            amount: 53120,
            amount_micros: 53120000000,
            amount_formatted: '',
            currency: 'USD',
            is_micros_accuracy: false,
          }}
        />,
      );

      expect(wrapper.text()).toBe('$53,120');
    });

    it('divides the amount when using micros', () => {
      const wrapper = shallow(
        <Price
          round
          amount={{
            amount: 792,
            amount_micros: 792000000,
            amount_formatted: '',
            currency: 'USD',
            is_micros_accuracy: true,
          }}
        />,
      );

      expect(wrapper.text()).toBe('$792.00');
    });

    it('can customize the display', () => {
      const wrapper = shallow(
        <Price
          amount={{
            amount: 12300,
            amount_micros: 12300000,
            amount_formatted: '',
            currency: 'JPY',
            is_micros_accuracy: false,
          }}
        />,
      );

      expect(wrapper.text()).toBe('¥12,300');

      wrapper.setProps({
        display: 'code',
      });

      expect(wrapper.text()).toMatch(/JPY\s*12,300/);

      wrapper.setProps({
        display: 'name',
      });

      expect(wrapper.text()).toBe('12,300 Japanese yen');
    });
  });
});
