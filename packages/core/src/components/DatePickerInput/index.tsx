import React from 'react';
import uuid from 'uuid/v4';
import { Omit } from 'utility-types';
import { DayPickerInputProps } from 'react-day-picker';
import { Props as BaseInputProps } from '../private/BaseInput';
import FormField, { Props as FormFieldProps, partitionFieldProps } from '../FormField';
import DateTime from '../DateTime';
import { Props as DatePickerProps } from '../DatePicker';
import { Props as DropdownProps } from '../Dropdown';
import createDateTime from '../../utils/createDateTime';
import { mdyCalendarBundle } from '../../messages';
import PrivatePickerInput from './Input';
import { Locale } from '../../types';

export type Props = Omit<BaseInputProps, 'id' | 'onChange' | 'value'> &
  FormFieldProps & {
    /** Clear the input when clicking on a previously selected day. */
    clearOnDayClick?: DayPickerInputProps['clickUnselectsDay'];
    /** Props to pass to the underlying `DatePicker`. */
    datePickerProps?: Partial<DatePickerProps>;
    /** Props to pass to the `Dropdown` component. */
    dropdownProps?: Partial<DropdownProps>;
    /** Format to display the date in. */
    format?: string;
    /** Hide the overlay when the user clicks on a day. */
    hideOnDayClick?: DayPickerInputProps['hideOnDayClick'];
    /** Locale to translate and format the calendar to. Defaults to "en". */
    locale?: Locale;
    /** Callback fired when the value changes. */
    onChange: (
      value: string,
      date: Date | null,
      event: React.ChangeEvent<HTMLInputElement>,
    ) => void;
    /** Handler function called when the overlay is hidden. */
    onHidePicker?: DayPickerInputProps['onDayPickerHide'];
    /** The default date value. */
    value?: string | Date;
  };

export type State = {
  id: string;
};

/** A controlled input field that opens a date picker. */
export default class DatePickerInput extends React.Component<Props, State> {
  static defaultProps = {
    hideOnDayClick: false,
  };

  state = {
    id: uuid(),
  };

  private handleChange = (event: React.ChangeEvent<any>) => {
    const { value } = event.currentTarget;
    const date = this.parseDate(value);

    this.props.onChange(value, date || null, event);
  };

  private handleDayChange = (day?: Date) => {
    // Day is undefined when the user is typing into the field
    // manually. We want to avoid overriding `onChange`.
    if (!day) {
      return;
    }

    // Update the parent form with the selected value.
    // We also don't have a real event object, so fake it.
    this.props.onChange(this.formatDate(day), day, {} as any);
  };

  getFormat(): string {
    return this.props.format || mdyCalendarBundle.get(this.props.locale);
  }

  parseDate = (value: string, format?: string, locale?: any) => {
    try {
      return createDateTime(value, {
        sourceFormat: format || this.getFormat(),
        locale: locale || this.props.locale,
      }).toJSDate();
    } catch (error) {
      return undefined;
    }
  };

  formatDate = (date: Date | string, baseFormat?: string, locale?: any) => {
    const format = baseFormat || this.getFormat();

    return DateTime.format({
      at: date,
      format,
      sourceFormat: format,
      locale: locale || this.props.locale,
      noTime: true,
      noTimezone: true,
    });
  };

  render() {
    const { fieldProps, inputProps } = partitionFieldProps(this.props);
    const {
      clearOnDayClick,
      datePickerProps,
      dropdownProps,
      hideOnDayClick,
      locale,
      onHidePicker,
      ...restProps
    } = inputProps;
    const { id } = this.state;
    const format = this.getFormat();
    const pickerProps = { ...datePickerProps, locale };

    return (
      <FormField {...fieldProps} id={id}>
        <PrivatePickerInput
          clickUnselectsDay={clearOnDayClick}
          dayPickerProps={pickerProps}
          dropdownProps={dropdownProps}
          inputProps={{
            ...restProps,
            id,
            onChange: this.handleChange,
          }}
          format={format}
          formatDate={this.formatDate}
          hideOnDayClick={hideOnDayClick}
          keepFocus
          onDayChange={this.handleDayChange}
          onDayPickerHide={onHidePicker}
          parseDate={this.parseDate}
          placeholder={restProps.placeholder || format.toUpperCase()}
          value={restProps.value}
        />
      </FormField>
    );
  }
}
