import React from 'react';
// @ts-ignore
import { DateUtils } from 'react-day-picker';
import DateTime from '../DateTime';
import Spacing from '../Spacing';
import Text from '../Text';
import DatePicker from '.';

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
        initialMonth={new Date(2019, 1, 1)}
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
        initialMonth={new Date(2019, 1, 1)}
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
    const modifiers = from && enteredTo ? { start: from, end: enteredTo } : undefined;
    const disabledDays = from ? { before: from } : undefined;
    const selectedDays = from && enteredTo ? [from, { from, to: enteredTo }] : undefined;

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

export default {
  title: 'Core/DatePicker',
  parameters: {
    inspectComponents: [DatePicker],
  },
};

export function displayASingleMonth() {
  return <DatePicker initialMonth={new Date(2019, 1, 1)} />;
}

displayASingleMonth.story = {
  name: 'Display a single month.',
};

export function displayATodayButton() {
  return (
    <DatePicker
      initialMonth={new Date(2019, 1, 1)}
      todayButton={DateTime.format({
        at: Date.now(),
        medium: true,
        noTime: true,
        noTimezone: true,
      })}
    />
  );
}

displayATodayButton.story = {
  name: 'Display a "Today" button.',
  parameters: { happo: false },
};

export function displayAResetButton() {
  return <DatePickerResetDemo />;
}

displayAResetButton.story = {
  name: 'Display a "Reset" button.',
  parameters: { happo: false },
};

export function displayMultipleMonths() {
  return <DatePicker initialMonth={new Date(2019, 1, 1)} numberOfMonths={2} />;
}

displayMultipleMonths.story = {
  name: 'Display multiple months.',
};

export function displayDaysAsDisabled() {
  return (
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
  );
}

displayDaysAsDisabled.story = {
  name: 'Display days as disabled.',
};

export function disableWeekends() {
  return (
    <DatePicker
      initialMonth={new Date(2017, 3)}
      disabledDays={[new Date(2017, 3, 12), { daysOfWeek: [0, 6] }]}
    />
  );
}

disableWeekends.story = {
  name: 'Disable weekends.',
};

export function displayDaysAsSelected() {
  return (
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
  );
}

displayDaysAsSelected.story = {
  name: 'Display days as selected.',
};

export function displayARangeOfDays() {
  return (
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
  );
}

displayARangeOfDays.story = {
  name: 'Display a range of days.',
};

export function todayButtonSelectsTodaysDate() {
  return <DatePickerTodayDemo />;
}

todayButtonSelectsTodaysDate.story = {
  name: "Today button selects today's date.",
};

export function selectDaysOnMouseEnter() {
  return <DatePickerMouseRangeSelectDemo />;
}

selectDaysOnMouseEnter.story = {
  name: 'Select days on mouse enter.',
  parameters: { happo: false },
};
