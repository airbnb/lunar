import React from 'react';
import uuid from 'uuid/v4';
import { DateTime } from 'luxon';
import { Omit } from 'utility-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import BaseSelect from '../private/BaseSelect';
import { SelectProps } from '../private/FormInput';
import FormField, { Props as FormFieldProps, partitionFieldProps } from '../FormField';
import T from '../Translate';
import createRange from '../../utils/createRange';
import createDateTime from '../../utils/createDateTime';
import getMonths from '../../utils/getMonths';
import { Locale } from '../../types';

type Range = {
  label: string;
  value: string;
}[];

export type Props = Omit<SelectProps, 'id' | 'value'> &
  FormFieldProps & {
    /** Enable 12-hour clock instead of 24-hour. */
    enable12HourClock?: boolean;
    /** Hide all date dropdowns. */
    hideDate?: boolean;
    /** Hide all time dropdowns. */
    hideTime?: boolean;
    /** Hide the year dropdown. */
    hideYear?: boolean;
    /** Locale to translate and format the timestamp to. Defaults to "en". */
    locale?: Locale;
    /** Incremental step for minutes. */
    minuteStep?: number;
    /** An empty `option` to render at the top of the list. */
    placeholder?: string;
    /** Callback fired when the value changes. */
    onChange: (value: string, event: React.ChangeEvent<HTMLSelectElement>) => void;
    /** Set to a new timezone. Defaults to the client timezone or "UTC". */
    timezone?: string | boolean;
    /** Number of years to go into the future. */
    yearFutureBuffer?: number;
    /** Number of years to go into the past. */
    yearPastBuffer?: number;
    /** Current date. Can be a string, number, Date object, or Luxon DateTime object. */
    value?: string | number | Date | DateTime;
  };

export type State = {
  id: string;
  date: DateTime;
  meridiem: string;
};

/** An uncontrolled multi-select field for date and time ranges in UTC. */
export class DateTimeSelect extends React.Component<Props & WithStylesProps, State> {
  static defaultProps = {
    enable12HourClock: false,
    hideDate: false,
    hideTime: false,
    hideYear: false,
    minuteStep: 5,
    yearFutureBuffer: 5,
    yearPastBuffer: 80,
  };

  private date = createDateTime(this.props.value, {
    locale: this.props.locale,
    timezone: this.props.timezone,
  }).set({ minute: 0, second: 0 });

  state = {
    id: uuid(),
    date: this.date,
    meridiem: this.date.get('hour') <= 11 ? 'am' : 'pm',
  };

  componentDidUpdate(prevProps: Props) {
    const { value, locale, timezone } = this.props;

    // Don't set minute/second to 0 here, because when used in conjunction with the form kit,
    // the value is always passed down, causing the numbers to always reset to 0.
    if (value !== prevProps.value) {
      const date = createDateTime(value, {
        locale,
        timezone,
      });

      this.setState({
        date,
        meridiem: date.get('hour') <= 11 ? 'am' : 'pm',
      });
    }
  }

  getDayRange(): Range {
    return createRange(1, this.state.date.daysInMonth).map(day => ({
      label: day,
      value: String(day),
    }));
  }

  getCurrentValue(date: DateTime, key: string): string {
    let value: any = Number(date.get(key as keyof DateTime));

    if (key === 'meridiem') {
      value = this.state.meridiem;
    } else if (key === 'hour' && this.props.enable12HourClock) {
      if (value === 0) {
        value = 12;
      } else if (value > 12) {
        value -= 12;
      }
    }

    return String(value);
  }

  getHourRange(): Range {
    return (this.props.enable12HourClock ? createRange(1, 12) : createRange(0, 23)).map(hour => ({
      label: hour,
      value: hour,
    }));
  }

  getMinuteRange(): Range {
    return createRange(0, 59, this.props.minuteStep).map(minute => ({
      label: minute.padStart(2, '0'),
      value: minute,
    }));
  }

  getMonthRange(): Range {
    return getMonths().map((month, i) => ({
      label: month,
      value: String(i + 1),
    }));
  }

  getYearRange(): Range {
    const now = createDateTime();

    return createRange(
      now.year - this.props.yearPastBuffer!,
      now.year + this.props.yearFutureBuffer!,
    )
      .reverse()
      .map(year => ({
        label: year,
        value: year,
      }));
  }

  private handleChange = (value: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    const { id } = event.target;
    const key = id.split('_')[1];

    this.setState(
      prevState => {
        let { date } = prevState;
        const meridiem = key === 'meridiem' ? value : prevState.meridiem;

        if (this.props.enable12HourClock && (key === 'hour' || key === 'meridiem')) {
          let hour = Number(key === 'hour' ? value : date.get('hour'));

          if (hour <= 12 && meridiem === 'pm') {
            hour += 12;

            if (hour === 24) {
              hour = 12;
            }
          } else if (hour >= 12 && meridiem === 'am') {
            hour -= 12;
          }

          date = date.set({ hour });
        } else {
          date = date.set({ [key]: value });
        }

        return {
          date,
          meridiem,
        };
      },
      () => {
        this.props.onChange(this.state.date.toISO(), event);
      },
    );
  };

  render() {
    const { fieldProps, inputProps } = partitionFieldProps(this.props);
    const {
      cx,
      name,
      styles,
      // Omit everything
      enable12HourClock,
      hideDate,
      hideTime,
      hideYear,
      minuteStep,
      yearFutureBuffer,
      yearPastBuffer,
      ...restProps
    } = inputProps;
    const { id, date } = this.state;

    return (
      <FormField {...fieldProps} id={id}>
        <div className={cx(styles.selects)}>
          {!hideDate && (
            <>
              <BaseSelect
                {...restProps}
                id={`${id}_month`}
                name={`${name}[month]`}
                value={this.getCurrentValue(date, 'month')}
                placeholder={T.phrase('Month', {}, 'Month dropdown in a form datetime field')}
                onChange={this.handleChange}
              >
                {this.getMonthRange().map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </BaseSelect>

              <div className={cx(styles.spacer)} />

              <BaseSelect
                {...restProps}
                id={`${id}_day`}
                name={`${name}[day]`}
                value={this.getCurrentValue(date, 'day')}
                placeholder={T.phrase('Day', {}, 'Day dropdown in a form datetime field')}
                onChange={this.handleChange}
              >
                {this.getDayRange().map(day => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </BaseSelect>

              <div className={cx(styles.spacer)} />

              {!hideYear && (
                <BaseSelect
                  {...restProps}
                  id={`${id}_year`}
                  name={`${name}[year]`}
                  value={this.getCurrentValue(date, 'year')}
                  placeholder={T.phrase('Year', {}, 'Year dropdown in a form datetime field')}
                  onChange={this.handleChange}
                >
                  {this.getYearRange().map(year => (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  ))}
                </BaseSelect>
              )}

              {!hideTime && (
                <>
                  <div className={cx(styles.spacer)} />
                  <div className={cx(styles.spacer)} />
                </>
              )}
            </>
          )}

          {!hideTime && (
            <>
              <BaseSelect
                {...restProps}
                id={`${id}_hour`}
                name={`${name}[hour]`}
                value={this.getCurrentValue(date, 'hour')}
                placeholder={T.phrase('Hour', {}, 'Hour dropdown in a form datetime field')}
                onChange={this.handleChange}
              >
                {this.getHourRange().map(hour => (
                  <option key={hour.value} value={hour.value}>
                    {hour.label}
                  </option>
                ))}
              </BaseSelect>

              <div className={cx(styles.spacer)}>:</div>

              <BaseSelect
                {...restProps}
                id={`${id}_minute`}
                name={`${name}[minute]`}
                value={this.getCurrentValue(date, 'minute')}
                placeholder={T.phrase('Minute', {}, 'Minute dropdown in a form datetime field')}
                onChange={this.handleChange}
              >
                {this.getMinuteRange().map(minute => (
                  <option key={minute.value} value={minute.value}>
                    {minute.label}
                  </option>
                ))}
              </BaseSelect>

              {enable12HourClock && (
                <>
                  <div className={cx(styles.spacer)} />

                  <BaseSelect
                    {...restProps}
                    id={`${id}_meridiem`}
                    name={`${name}[meridiem]`}
                    value={this.getCurrentValue(date, 'meridiem')}
                    placeholder={T.phrase(
                      'Meridiem',
                      {},
                      'Meridiem (AM/PM) dropdown in a form datetime field',
                    )}
                    onChange={this.handleChange}
                  >
                    <option value="am">{T.phrase('AM', {}, 'Meridiem for timestamps')}</option>
                    <option value="pm">{T.phrase('PM', {}, 'Meridiem for timestamps')}</option>
                  </BaseSelect>
                </>
              )}
            </>
          )}
        </div>
      </FormField>
    );
  }
}

export default withStyles(({ unit }) => ({
  selects: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',

    '@selectors': {
      '> div': {
        flexGrow: 0,
        width: 'auto',
      },
    },
  },

  spacer: {
    paddingLeft: unit / 2,
    paddingRight: unit / 2,
  },
}))(DateTimeSelect);
