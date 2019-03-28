import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../../src/components/Dropdown';
import DatePicker from '../../src/components/DatePicker';
import DatePickerInput from '../../src/components/DatePickerInput';
import PrivatePickerInput from '../../src/components/DatePickerInput/Input';
import FormField from '../../src/components/FormField';
import FormInput from '../../src/components/private/FormInput';
import { FORMAT_YMD } from '../../src/constants';

describe('<DatePickerInput />', () => {
  const props = {
    format: FORMAT_YMD,
    hideOnDayClick: true,
    keepFocus: true,
    label: 'Date',
    name: 'date',
    onChange() {},
  };

  it('renders a field and input', () => {
    const wrapper = shallow(<DatePickerInput {...props} />);

    expect(wrapper.find(FormField)).toHaveLength(1);
    expect(wrapper.find(PrivatePickerInput)).toHaveLength(1);
  });

  it('it generates a unique ID', () => {
    const wrapper = shallow(<DatePickerInput {...props} />);

    expect(wrapper.find(FormField).prop('id')).toBe(
      (wrapper.find(PrivatePickerInput).prop('inputProps') as any).id,
    );
  });

  it('it uses custom date formatting', () => {
    const wrapper = shallow(<DatePickerInput {...props} format="dd/MM/yyyy" />);

    expect(wrapper.find(PrivatePickerInput).prop('format')).toBe('dd/MM/yyyy');
  });

  it('passes date picker props to picker input', () => {
    const onHide = jest.fn();
    const datePickerProps = { showResetButton: true };
    const wrapper = shallow(
      <DatePickerInput
        {...props}
        clearOnDayClick
        hideOnDayClick
        locale="fr"
        onHidePicker={onHide}
        datePickerProps={datePickerProps}
      />,
    );

    expect(wrapper.find(PrivatePickerInput).prop('clickUnselectsDay')).toBe(true);
    expect(wrapper.find(PrivatePickerInput).prop('hideOnDayClick')).toBe(true);
    expect(wrapper.find(PrivatePickerInput).prop('onDayPickerHide')).toBe(onHide);
    expect(wrapper.find(PrivatePickerInput).prop('dayPickerProps')).toEqual({
      showResetButton: true,
      locale: 'fr',
    });
  });

  it('passes input props to picker input', () => {
    const wrapper = shallow(<DatePickerInput {...props} placeholder="What" value="Why" disabled />);

    expect(wrapper.find(PrivatePickerInput).prop('placeholder')).toBe('What');
    expect(wrapper.find(PrivatePickerInput).prop('value')).toBe('Why');
    expect(wrapper.find(PrivatePickerInput).prop('inputProps')).toEqual(
      expect.objectContaining({ disabled: true }),
    );
  });

  it('passes handlers to the correct locations', () => {
    const wrapper = shallow(<DatePickerInput {...props} />);
    const instance = wrapper.instance() as DatePickerInput;

    expect(wrapper.find(PrivatePickerInput).prop('formatDate')).toBe(instance.formatDate);
    expect(wrapper.find(PrivatePickerInput).prop('parseDate')).toBe(instance.parseDate);
    expect((wrapper.find(PrivatePickerInput).prop('inputProps') as any).onChange).toBe(
      // @ts-ignore Allow private access
      instance.handleChange,
    );
  });

  describe('handleChange()', () => {
    it('calls `onChange` with an ISO date', () => {
      const spy = jest.fn();
      const wrapper = shallow(<DatePickerInput {...props} onChange={spy} />);
      const instance = wrapper.instance() as DatePickerInput;
      const event = {
        currentTarget: { value: '2019-01-01' },
      };

      // @ts-ignore Allow private access
      instance.handleChange(event);

      expect(spy).toHaveBeenCalledWith('2019-01-01', new Date(2019, 0, 1), event);
    });

    it('calls `onChange` with a null when an invalid date', () => {
      const spy = jest.fn();
      const wrapper = shallow(<DatePickerInput {...props} onChange={spy} />);
      const instance = wrapper.instance() as DatePickerInput;
      const event = {
        currentTarget: { value: '2019-ah-01' },
      };

      // @ts-ignore Allow private access
      instance.handleChange(event);

      expect(spy).toHaveBeenCalledWith('2019-ah-01', null, event);
    });
  });

  describe('handleDayChange()', () => {
    it('calls `onChange`', () => {
      const spy = jest.fn();
      const wrapper = shallow(<DatePickerInput {...props} onChange={spy} />);
      const instance = wrapper.instance() as DatePickerInput;
      const date = new Date();

      // @ts-ignore Allow private access
      instance.handleDayChange(date);

      expect(spy).toHaveBeenCalledWith(instance.formatDate(date), date, {});
    });

    it('doesnt call `onChange` if falsy', () => {
      const spy = jest.fn();
      const wrapper = shallow(<DatePickerInput {...props} onChange={spy} />);
      const instance = wrapper.instance() as DatePickerInput;

      // @ts-ignore Allow private access
      instance.handleDayChange('');

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('parseDate()', () => {
    it('parses a date', () => {
      const wrapper = shallow(<DatePickerInput {...props} />);
      const instance = wrapper.instance() as DatePickerInput;

      expect(instance.parseDate('2018-06-25')).toBeInstanceOf(Date);
    });

    it('returns undefined for a failed parse', () => {
      const wrapper = shallow(<DatePickerInput {...props} format="MM/dd/yyyy" />);
      const instance = wrapper.instance() as DatePickerInput;

      expect(instance.parseDate('2sdsd')).toBeUndefined();
    });
  });

  describe('formatDate()', () => {
    it('formats a date', () => {
      const wrapper = shallow(<DatePickerInput {...props} />);
      const instance = wrapper.instance() as DatePickerInput;

      expect(instance.formatDate('2018-06-25')).toBe('2018-06-25');
    });

    it('formats a date using the `format` prop', () => {
      const wrapper = shallow(<DatePickerInput {...props} format="MM/dd/yyyy" />);
      const instance = wrapper.instance() as DatePickerInput;

      expect(instance.formatDate('03/15/2018')).toBe('03/15/2018');
    });
  });

  describe('<PrivatePickerInput />', () => {
    it('renders a form input', () => {
      const wrapper = shallow(<PrivatePickerInput {...props} />);

      expect(wrapper.find(FormInput)).toHaveLength(1);
      expect(wrapper.find(FormInput).prop('type')).toBe('text');
      expect(wrapper.find(FormInput).prop('tagName')).toBe('input');
    });

    it('renders a dropdown + date picker when overlay is shown', () => {
      const wrapper = shallow(<PrivatePickerInput {...props} />);

      expect(wrapper.find(Dropdown)).toHaveLength(0);

      wrapper.setState({
        showOverlay: true,
      });

      expect(wrapper.find(Dropdown)).toHaveLength(1);
      expect(wrapper.find(DatePicker)).toHaveLength(1);
    });

    it('passes props to date picker', () => {
      const datePickerProps = { showResetButton: true, firstDayOfWeek: 0 };
      const wrapper = shallow(<PrivatePickerInput {...props} dayPickerProps={datePickerProps} />);

      wrapper.setState({
        showOverlay: true,
      });

      expect(wrapper.find(DatePicker).props()).toEqual(expect.objectContaining(datePickerProps));
    });

    it('calls `onChange` prop from the input field', () => {
      const spy = jest.fn();
      const wrapper = shallow(<PrivatePickerInput {...props} inputProps={{ onChange: spy }} />);
      const event = {
        persist() {},
        target: {
          value: 'foo',
        },
      };

      wrapper.find(FormInput).simulate('change', event);

      expect(spy).toHaveBeenCalledWith(event);
    });
  });
});
