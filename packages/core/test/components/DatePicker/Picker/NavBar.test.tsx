import React from 'react';
import { shallow } from 'enzyme';
// @ts-ignore
import { LocaleUtils } from 'react-day-picker/lib/src/LocaleUtils';
import DirectionalIcon from '../../../../src/components/DirectionalIcon';
import NavBar, { Props } from '../../../../src/components/DatePicker/Picker/NavBar';

describe('<DatePicker />', () => {
  const props: Props = {
    className: 'navBar_3hmsj',
    classNames: {
      body: 'body_1i2nzqg',
      caption: 'caption_15l7lx2',
      container: 'calendarContainer_1uslj8c',
      day: 'day_ihrdgy',
      disabled: 'modifier_disabled_16oeow2',
      interactionDisabled: 'interactionDisabled_1ety1lk',
      month: 'month_gdw8h5',
      months: 'months_131ir0y',
      navBar: 'navBar_3hmsj',
      navButtonInteractionDisabled: 'navButtonInteractionDisabled_1u9fru1',
      navButtonNext: 'navButtonNext_4w28j8',
      navButtonPrev: 'navButtonPrev_1oadu1b',
      outside: 'modifier_outside_14sehch',
      selected: 'modifier_selected_1hbddal',
      today: 'modifier_today_153t78d',
      week: 'week_gyif22',
      weekday: 'weekday_9gdx0',
      weekdays: 'weekdays_1ie1qal',
      weekdaysRow: 'weekdaysRow_gyif22',
      wrapper: 'wrapper_1ymisw3',
      // No styles yet
      weekNumber: '',
      footer: '',
      todayButton: '',
    },
    labels: {
      nextMonth: 'Next Month',
      previousMonth: 'Previous Month',
    },
    locale: 'en',
    localeUtils: LocaleUtils,
    month: new Date(2017, 4, 5),
    previousMonth: new Date(2017, 3, 5),
    nextMonth: new Date(2017, 5, 5),
    showPreviousButton: true,
    showNextButton: true,
    showResetButton: false,
    onNextClick: () => {},
    onPreviousClick: () => {},
    onResetClick: () => {},
  };

  it('renders next & previous icons', () => {
    const wrapper = shallow(<NavBar {...props} />).dive();

    expect(wrapper.find(DirectionalIcon)).toHaveLength(2);
  });

  it('renders a reset button', () => {
    const wrapper = shallow(<NavBar {...props} showResetButton />).dive();

    expect(wrapper.contains('Reset')).toBe(true);
  });

  it('call `onPreviousClick` when next button is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<NavBar {...props} onPreviousClick={spy} />).dive();

    wrapper
      .find(DirectionalIcon)
      .at(0)
      .parent()
      .simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('call `onNextClick` when next button is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<NavBar {...props} onNextClick={spy} />).dive();

    wrapper
      .find(DirectionalIcon)
      .at(1)
      .parent()
      .simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('call `onResetClick` when next button is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <NavBar
        {...props}
        showResetButton
        showPreviousButton={false}
        showNextButton={false}
        onResetClick={spy}
      />,
    ).dive();

    wrapper.find('button').simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
