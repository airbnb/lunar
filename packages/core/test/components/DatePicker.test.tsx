import React from 'react';
import DayPicker from 'react-day-picker';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import DatePicker from '../../src/components/DatePicker';

describe('<DatePicker />', () => {
  it('renders a DayPicker', () => {
    const wrapper = shallowWithStyles(<DatePicker />);

    expect(wrapper.find(DayPicker)).toHaveLength(1);
  });

  it('renders a today button', () => {
    const wrapper = shallowWithStyles(<DatePicker todayButton="Today" />).dive();

    expect(wrapper.find('button[children="Today"]')).toHaveLength(1);
  });

  it('renders a reset button in the navbar element', () => {
    const wrapper = shallowWithStyles(<DatePicker showResetButton />).dive();

    expect(
      wrapper
        .find('navbarElement')
        .dive()
        .dive()
        .dive()
        .contains('Reset'),
    ).toBe(true);
  });
});
