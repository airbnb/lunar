import React from 'react';
import DayPicker from 'react-day-picker';
import { shallow } from 'enzyme';
import DatePicker from '../../src/components/DatePicker';

describe('<DatePicker />', () => {
  it('renders a DayPicker', () => {
    const wrapper = shallow(<DatePicker />).dive();

    expect(wrapper.find(DayPicker)).toHaveLength(1);
  });

  it('renders a today button', () => {
    const wrapper = shallow(<DatePicker todayButton="Today" />)
      .dive()
      .dive();

    expect(wrapper.find('button[children="Today"]')).toHaveLength(1);
  });

  it('renders a reset button in the navbar element', () => {
    const wrapper = shallow(<DatePicker showResetButton />)
      .dive()
      .dive();

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
