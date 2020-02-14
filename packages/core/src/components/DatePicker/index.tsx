import React from 'react';
import DayPicker, { DayPickerProps } from 'react-day-picker';
import datePickerStyles from '../private/datePickerStyles';
import getMonths from '../../utils/getMonths';
import getWeekdays from '../../utils/getWeekdays';
import { getClassNames, getCustomModifiers } from '../../utils/datePicker';
import NavBar from './Picker/NavBar';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

export type DatePickerProps = {
  /** Day(s) that should appear as disabled. Set a `disabled` modifier. See Matching days for a reference of the accepted value types. */
  disabledDays?: DayPickerProps['disabledDays'];
  /** The day to use as first day of the week, starting from 0 (Sunday) to 6 (Saturday). */
  firstDayOfWeek?: DayPickerProps['firstDayOfWeek'];
  /** The first allowed month. Users won’t be able to navigate or interact with the days before it. */
  fromMonth?: DayPickerProps['fromMonth'];
  /** The month to display in the calendar at first render. This differs from the `month` prop, as it won’t re-render the calendar if its value changes. */
  initialMonth?: DayPickerProps['initialMonth'];
  /** Locale to translate and format the calendar to. Defaults to "en". */
  locale?: string;
  /** An object of day modifiers. See [matching days](http://react-day-picker.js.org/docs/matching-days). */
  modifiers?: DayPickerProps['modifiers'];
  /** The month to display in the calendar. This differs from the `initialMonth` prop, as it causes the calendar to re-render when its value changes. */
  month?: DayPickerProps['month'];
  /** The number of months to render. Default to `1`. */
  numberOfMonths?: DayPickerProps['numberOfMonths'];
  /** When displaying multiple months, navigation will be paginated displaying the `numberOfMonths` at time instead of one. */
  pagedNavigation?: DayPickerProps['pagedNavigation'];
  /** @ignore */
  pickerRef?: string | ((instance: DayPicker | null) => void) | React.RefObject<DayPicker> | null;
  /** Day(s) that should appear as selected. Set a `selected` modifier. See [matching days](http://react-day-picker.js.org/docs/matching-days) for a reference of the accepted value types. */
  selectedDays?: DayPickerProps['selectedDays'];
  /** Show the reset button. */
  showResetButton?: boolean;
  /** Display a button to switch to the current month using the provided string as label. */
  todayButton?: DayPickerProps['todayButton'];
  /** The last allowed month. Users won’t be able to navigate or interact with the days after it. */
  toMonth?: DayPickerProps['toMonth'];
  /** Event handler when the calendar get the `blur` event. */
  onBlur?: DayPickerProps['onBlur'];
  /** Event handler when the user clicks on a day cell. */
  onDayClick?: DayPickerProps['onDayClick'];
  /** Event handler when the mouse enters a day cell. */
  onDayMouseEnter?: DayPickerProps['onDayMouseEnter'];
  /** Event handler when the calendar get the `focus` event. */
  onFocus?: DayPickerProps['onFocus'];
  /** Event handler when the month is changed, i.e. clicking the navigation buttons or using the keyboard. */
  onMonthChange?: DayPickerProps['onMonthChange'];
  /** Callback for a reset button. */
  onResetClick?: () => void;
  /** Event hander when the user clicks on the today button (when `todayButton` is set). */
  onTodayButtonClick?: DayPickerProps['onTodayButtonClick'];
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/**
 * Display a date picker.
 * Utilizes [react-day-picker](http://react-day-picker.js.org/api/DayPicker/).
 */

export default function DatePicker(props: DatePickerProps) {
  const {
    disabledDays,
    firstDayOfWeek = 0,
    fromMonth,
    initialMonth,
    locale,
    modifiers,
    month,
    numberOfMonths = 1,
    onBlur,
    onDayClick,
    onDayMouseEnter,
    onFocus,
    onMonthChange,
    onResetClick,
    onTodayButtonClick,
    pagedNavigation,
    pickerRef,
    selectedDays,
    showResetButton,
    todayButton,
    toMonth,
    styleSheet,
  } = props;
  const [styles, cx] = useStyles(styleSheet ?? datePickerStyles);

  return (
    <DayPicker
      ref={pickerRef}
      weekdaysShort={getWeekdays('short', true)}
      classNames={getClassNames('calendar', styles, { ...props, cx, styles })}
      disabledDays={disabledDays}
      firstDayOfWeek={firstDayOfWeek}
      fromMonth={fromMonth}
      initialMonth={initialMonth}
      locale={locale}
      modifiers={getCustomModifiers(modifiers, styles, cx)}
      month={month}
      months={getMonths()}
      navbarElement={navProps => (
        <NavBar
          {...navProps}
          noFooter={!todayButton}
          showResetButton={showResetButton}
          onResetClick={onResetClick}
        />
      )}
      fixedWeeks={Boolean(numberOfMonths && numberOfMonths > 1)}
      weekdaysLong={getWeekdays('long', true)}
      toMonth={toMonth}
      todayButton={todayButton}
      selectedDays={selectedDays}
      pagedNavigation={pagedNavigation}
      numberOfMonths={numberOfMonths}
      onTodayButtonClick={onTodayButtonClick}
      onMonthChange={onMonthChange}
      onFocus={onFocus}
      onDayMouseEnter={onDayMouseEnter}
      onDayClick={onDayClick}
      onBlur={onBlur}
    />
  );
}
