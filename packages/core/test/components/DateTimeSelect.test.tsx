import React from 'react';
import Enzyme from 'enzyme';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import DateTimeSelect, {
  DateTimeSelect as BaseDateTimeSelect,
  Props,
} from '../../src/components/DateTimeSelect';
import FormField from '../../src/components/FormField';
import BaseSelect from '../../src/components/private/BaseSelect';

describe('<DateTimeSelect />', () => {
  const date = new Date(Date.UTC(1988, 1, 26, 16, 12, 5));
  const props: Props = {
    name: 'foo',
    label: 'Label',
    value: '',
    onChange() {},
    locale: 'en',
    timezone: 'UTC',
  };

  it('renders a field and input', () => {
    const wrapper = shallowWithStyles(<DateTimeSelect {...props} />);

    expect(wrapper.find(FormField)).toHaveLength(1);
    expect(wrapper.find(BaseSelect)).toHaveLength(5);
  });

  it('hides date dropdowns', () => {
    const wrapper = shallowWithStyles(<DateTimeSelect {...props} hideDate />);

    expect(wrapper.find(BaseSelect)).toHaveLength(2);
  });

  it('hides year dropdown', () => {
    const wrapper = shallowWithStyles(<DateTimeSelect {...props} hideYear />);

    expect(wrapper.find(BaseSelect)).toHaveLength(4);
  });

  it('hides time dropdowns', () => {
    const wrapper = shallowWithStyles(<DateTimeSelect {...props} hideTime />);

    expect(wrapper.find(BaseSelect)).toHaveLength(3);
  });

  it('shows meridiem dropdown', () => {
    const wrapper = shallowWithStyles(<DateTimeSelect {...props} enable12HourClock />);

    expect(wrapper.find(BaseSelect)).toHaveLength(6);
  });

  describe('getDayRange()', () => {
    it('returns list of days based on current month', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(
        <DateTimeSelect {...props} value={date} />,
      );

      expect(wrapper.instance().getDayRange().length <= 29).toBe(true);

      wrapper.setProps({
        value: wrapper.state('date').plus({ months: 1 }),
      });

      expect(wrapper.instance().getDayRange()).toHaveLength(31);
    });
  });

  describe('getCurrentValue()', () => {
    let wrapper: Enzyme.ShallowWrapper<
      BaseDateTimeSelect['props'],
      BaseDateTimeSelect['state'],
      BaseDateTimeSelect
    >;
    let instance: BaseDateTimeSelect;

    beforeEach(() => {
      wrapper = shallowWithStyles<BaseDateTimeSelect>(<DateTimeSelect {...props} value={date} />);
      instance = wrapper.instance();
    });

    it('returns month', () => {
      expect(instance.getCurrentValue(wrapper.state('date'), 'month')).toBe('2');
    });

    it('returns day', () => {
      expect(instance.getCurrentValue(wrapper.state('date'), 'day')).toBe('26');
    });

    it('returns year', () => {
      expect(instance.getCurrentValue(wrapper.state('date'), 'year')).toBe('1988');
    });

    it('returns hour', () => {
      expect(instance.getCurrentValue(wrapper.state('date'), 'hour')).toBe('16');
    });

    it('returns 6pm (12-hour clock)', () => {
      wrapper.setProps({
        enable12HourClock: true,
      });

      wrapper.setState({
        date: wrapper.state('date').set({ hour: 18 }),
      });

      expect(instance.getCurrentValue(wrapper.state('date'), 'hour')).toBe('6');
    });

    it('returns 12pm (12-hour clock)', () => {
      wrapper.setProps({
        enable12HourClock: true,
      });

      wrapper.setState({
        date: wrapper.state('date').set({ hour: 0 }),
      });

      expect(instance.getCurrentValue(wrapper.state('date'), 'hour')).toBe('12');
    });

    it('returns 4am (12-hour clock)', () => {
      wrapper.setProps({
        enable12HourClock: true,
      });

      wrapper.setState({
        date: wrapper.state('date').set({ hour: 4 }),
      });

      expect(instance.getCurrentValue(wrapper.state('date'), 'hour')).toBe('4');
    });

    it('returns 12am (12-hour clock)', () => {
      wrapper.setProps({
        enable12HourClock: true,
      });

      wrapper.setState({
        date: wrapper.state('date').set({ hour: 12 }),
      });

      expect(instance.getCurrentValue(wrapper.state('date'), 'hour')).toBe('12');
    });

    it('returns minute', () => {
      expect(instance.getCurrentValue(wrapper.state('date'), 'minute')).toBe('0');
    });

    it('returns meridiem (from state)', () => {
      expect(instance.getCurrentValue(wrapper.state('date'), 'meridiem')).toBe('pm');

      wrapper.setState({
        meridiem: 'am',
      });

      expect(instance.getCurrentValue(wrapper.state('date'), 'meridiem')).toBe('am');
    });
  });

  describe('getHourRange()', () => {
    it('returns 24 hours by default', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(<DateTimeSelect {...props} />);

      expect(wrapper.instance().getHourRange()).toHaveLength(24);
    });

    it('returns 12 hours', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(
        <DateTimeSelect {...props} enable12HourClock />,
      );

      expect(wrapper.instance().getHourRange()).toHaveLength(12);
    });
  });

  describe('getMinuteRange()', () => {
    it('returns 60 minutes', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(<DateTimeSelect {...props} />);

      expect(wrapper.instance().getMinuteRange()).toHaveLength(12);
    });

    it('can change step', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(
        <DateTimeSelect {...props} minuteStep={1} />,
      );

      expect(wrapper.instance().getMinuteRange()).toHaveLength(60);
    });

    it('pads number', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(<DateTimeSelect {...props} />);

      expect(wrapper.instance().getMinuteRange()[0]).toEqual({
        label: '00',
        value: '0',
      });
    });
  });

  describe('getMonthRange()', () => {
    it('returns 12 hours by default', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(<DateTimeSelect {...props} />);

      expect(wrapper.instance().getMonthRange()).toHaveLength(12);
    });

    it('returns localized label', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(<DateTimeSelect {...props} />);

      expect(wrapper.instance().getMonthRange()[0]).toEqual({
        label: 'January',
        value: '1',
      });
    });
  });

  describe('getYearRange()', () => {
    it('returns current year with buffer', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(
        <DateTimeSelect {...props} yearPastBuffer={1} yearFutureBuffer={1} />,
      );
      const year = new Date().getFullYear();

      expect(wrapper.instance().getYearRange()).toEqual([
        { label: String(year + 1), value: String(year + 1) },
        { label: String(year), value: String(year) },
        { label: String(year - 1), value: String(year - 1) },
      ]);
    });
  });

  describe('handleChange()', () => {
    function simulateChange<P>(wrapper: Enzyme.ShallowWrapper<P>, type: string, value: unknown) {
      const event = {
        target: {
          id: `foo_${type}`,
          value,
        },
      };

      wrapper
        .findWhere(node => node.type() === BaseSelect && node.prop('name') === `foo[${type}]`)
        .simulate('change', value, event);

      return event;
    }

    it('calls `onChange` prop', () => {
      const spy = jest.fn();
      const wrapper = shallowWithStyles(<DateTimeSelect {...props} value={date} onChange={spy} />);
      const event = simulateChange(wrapper, 'hour', 12);

      expect(spy).toHaveBeenCalledWith('1988-02-26T12:00:00.000Z', event);
    });

    it('sets month', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(
        <DateTimeSelect {...props} value={date} />,
      );

      simulateChange(wrapper, 'month', 10);

      expect(wrapper.state('date').month).toBe(10);
    });

    it('sets day', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(
        <DateTimeSelect {...props} value={date} />,
      );

      simulateChange(wrapper, 'day', 15);

      expect(wrapper.state('date').day).toBe(15);
    });

    it('sets year', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(
        <DateTimeSelect {...props} value={date} />,
      );

      simulateChange(wrapper, 'year', 2000);

      expect(wrapper.state('date').year).toBe(2000);
    });

    it('sets hour', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(
        <DateTimeSelect {...props} value={date} />,
      );

      simulateChange(wrapper, 'hour', 11);

      expect(wrapper.state('date').hour).toBe(11);
    });

    it('sets 8pm (12-hour clock)', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(
        <DateTimeSelect {...props} enable12HourClock value={date} />,
      );

      wrapper.setState({
        meridiem: 'pm',
      });

      simulateChange(wrapper, 'hour', 8);

      expect(wrapper.state('date').hour).toBe(20);
    });

    it('sets 12pm (12-hour clock)', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(
        <DateTimeSelect {...props} enable12HourClock value={date} />,
      );

      wrapper.setState({
        meridiem: 'pm',
      });

      simulateChange(wrapper, 'hour', 12);

      expect(wrapper.state('date').hour).toBe(12);
    });

    it('sets 2am (12-hour clock)', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(
        <DateTimeSelect {...props} enable12HourClock value={date} />,
      );

      wrapper.setState({
        meridiem: 'am',
      });

      simulateChange(wrapper, 'hour', 14);

      expect(wrapper.state('date').hour).toBe(2);
    });

    it('sets 12am (12-hour clock)', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(
        <DateTimeSelect {...props} enable12HourClock value={date} />,
      );

      wrapper.setState({
        meridiem: 'am',
      });

      simulateChange(wrapper, 'hour', 12);

      expect(wrapper.state('date').hour).toBe(0);
    });

    it('sets minute', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(
        <DateTimeSelect {...props} value={date} />,
      );

      simulateChange(wrapper, 'minute', 55);

      expect(wrapper.state('date').minute).toBe(55);
    });

    it('sets meridiem', () => {
      const wrapper = shallowWithStyles(
        <DateTimeSelect {...props} enable12HourClock value={date} />,
      );

      simulateChange(wrapper, 'meridiem', 'pm');

      expect(wrapper.state('meridiem')).toBe('pm');
    });

    it('updates hour when meridiem changes (12-hour clock)', () => {
      const wrapper = shallowWithStyles<BaseDateTimeSelect>(
        <DateTimeSelect {...props} enable12HourClock value={date} />,
      );

      wrapper.setState({
        date: wrapper.state('date').set({ hour: 7 }),
      });

      simulateChange(wrapper, 'meridiem', 'pm');

      expect(wrapper.state('meridiem')).toBe('pm');
      expect(wrapper.state('date').hour).toBe(19);
    });
  });
});
