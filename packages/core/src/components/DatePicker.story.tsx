import React from 'react';
import { storiesOf } from '@storybook/react';
import { DateUtils } from 'react-day-picker';
import DateTime from './DateTime';
import Spacing from './Spacing';
import Text from './Text';
import DatePicker from './DatePicker';

class DatePickerTodayDemo extends React.Component<{}, { selectedDay?: Date }> {
  state = {
    selectedDay: undefined,
  };

  handleDayClick = () => {
    this.setState({
      selectedDay: undefined,
    });
  };

  handleTodayButtonClick = (day: Date) => {
    this.setState({
      selectedDay: day,
    });
  };

  render() {
    const { selectedDay } = this.state;

    return (
      <DatePicker
        selectedDays={selectedDay}
        todayButton="Today"
        onDayClick={this.handleDayClick}
        onTodayButtonClick={this.handleTodayButtonClick}
      />
    );
  }
}

type ResetState = { selectedDays: Date[] };

class DatePickerResetDemo extends React.Component<{}, ResetState> {
  state: ResetState = {
    selectedDays: [],
  };

  handleResetClick = () => {
    this.setState({ selectedDays: [] });
  };

  handleDayClick = (day: Date) => {
    const { selectedDays } = this.state;

    const selectedIndex = selectedDays.findIndex(selectedDay =>
      // @ts-ignore
      DateUtils.isSameDay(selectedDay, day),
    );

    if (selectedIndex > -1) {
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }

    this.setState({ selectedDays });
  };

  render() {
    const { selectedDays } = this.state;

    return (
      <DatePicker
        showResetButton
        initialMonth={new Date()}
        selectedDays={selectedDays}
        todayButton={DateTime.format({
          at: Date.now(),
          medium: true,
          noTime: true,
          noTimezone: true,
        })}
        onDayClick={this.handleDayClick}
        onResetClick={this.handleResetClick}
        onTodayButtonClick={this.handleDayClick}
      />
    );
  }
}

type RangeState = {
  from: Date | null;
  to: Date | null;
  enteredTo: Date | null;
};

class DatePickerMouseRangeSelectDemo extends React.Component<{}, RangeState> {
  state = this.getInitialState();

  getInitialState(): RangeState {
    return {
      from: null,
      to: null,
      enteredTo: null, // Keep track of the last day for mouseEnter.
    };
  }

  isSelectingFirstDay(from: RangeState['from'], to: RangeState['to'], day: Date) {
    // @ts-ignore
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;

    return !from || isBeforeFirstDay || isRangeSelected;
  }

  handleDayClick = (day: Date) => {
    const { from, to } = this.state;

    if (from && to && day >= from && day <= to) {
      this.handleResetClick();

      return;
    }

    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null,
      });
    } else {
      this.setState({
        to: day,
        enteredTo: day,
      });
    }
  };

  handleDayMouseEnter = (day: Date) => {
    const { from, to } = this.state;

    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  };

  handleResetClick = () => {
    this.setState(this.getInitialState());
  };

  render() {
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = from && { before: from };
    const selectedDays = from && enteredTo && [from, { from, to: enteredTo }];

    return (
      <div>
        {!from && !to && <Text bold>Please select the first day.</Text>}
        {from && !to && <Text bold>Please select the last day.</Text>}
        {from && to && (
          <Text bold>
            {`Selected from ${from.toLocaleDateString()} to ${to.toLocaleDateString()}`}
          </Text>
        )}

        <Spacing top={2}>
          <DatePicker
            showResetButton
            disabledDays={disabledDays}
            fromMonth={from || new Date()}
            modifiers={modifiers}
            numberOfMonths={2}
            selectedDays={selectedDays}
            todayButton={DateTime.format({
              at: Date.now(),
              medium: true,
              noTime: true,
              noTimezone: true,
            })}
            onDayClick={this.handleDayClick}
            onDayMouseEnter={this.handleDayMouseEnter}
            onResetClick={this.handleResetClick}
          />
        </Spacing>
      </div>
    );
  }
}

storiesOf('Core/DatePicker', module)
  .add('Display a single month.', () => <DatePicker />)
  .add('Display a "Today" button.', () => (
    <DatePicker
      todayButton={DateTime.format({
        at: Date.now(),
        medium: true,
        noTime: true,
        noTimezone: true,
      })}
    />
  ))
  .add('Display a "Reset" button.', () => <DatePickerResetDemo />)
  .add('Display multiple months.', () => <DatePicker numberOfMonths={2} />)
  .add('Display days as disabled.', () => (
    <DatePicker
      initialMonth={new Date(2017, 3)}
      disabledDays={[
        new Date(2017, 3, 12),
        new Date(2017, 3, 2),
        {
          after: new Date(2017, 3, 20),
          before: new Date(2017, 3, 25),
        },
      ]}
    />
  ))
  .add('Disable weekends.', () => (
    <DatePicker
      initialMonth={new Date(2017, 3)}
      disabledDays={[new Date(2017, 3, 12), { daysOfWeek: [0, 6] }]}
    />
  ))
  .add('Display days as selected.', () => (
    <DatePicker
      initialMonth={new Date(2017, 3)}
      selectedDays={[
        new Date(2017, 3, 12),
        new Date(2017, 3, 2),
        {
          after: new Date(2017, 3, 20),
          before: new Date(2017, 3, 25),
        },
      ]}
    />
  ))
  .add('Display a range of days.', () => (
    <DatePicker
      initialMonth={new Date(2017, 3)}
      modifiers={{
        start: new Date(2017, 3, 18),
        end: new Date(2017, 3, 29),
      }}
      selectedDays={[
        {
          from: new Date(2017, 3, 18),
          to: new Date(2017, 3, 29),
        },
      ]}
    />
  ))
  .add("Today button selects today's date.", () => <DatePickerTodayDemo />)
  .add('Select days on mouse enter.', () => <DatePickerMouseRangeSelectDemo />);
