Display a single month.

```jsx
<DatePicker />
```

Display a "Today" button.

```jsx
import DateTime from '../DateTime';

<DatePicker
  todayButton={DateTime.format({
    at: Date.now(),
    medium: true,
    noTime: true,
    noTimezone: true,
  })}
/>;
```

Today button selects today's date.

```jsx
import React from 'react';
import DateTime from '../DateTime';

class DatePickerTodayDemo extends React.Component {
  constructor(props) {
    super(props);

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleTodayButtonClick = this.handleTodayButtonClick.bind(this);

    this.state = {
      selectedDay: undefined,
    };
  }

  handleDayClick(selectedDay, modifiers) {
    this.setState({
      selectedDay: undefined,
    });
  }

  handleTodayButtonClick(day, modifiers) {
    this.setState({
      selectedDay: day,
    });
  }

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

<DatePickerTodayDemo />;
```

Display a "Reset" button.

```jsx
import React from 'react';
import { DateUtils } from 'react-day-picker';
import DateTime from '../DateTime';

class DatePickerResetDemo extends React.Component {
  constructor(props) {
    super(props);

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);

    this.state = {
      selectedDays: [],
    };
  }

  handleResetClick() {
    this.setState({ selectedDays: [] });
  }

  handleDayClick(day) {
    const { selectedDays } = this.state;

    const selectedIndex = selectedDays.findIndex(selectedDay =>
      DateUtils.isSameDay(selectedDay, day),
    );

    if (selectedIndex > -1) {
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }

    this.setState({ selectedDays });
  }

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

<DatePickerResetDemo />;
```

Display multiple months.

```jsx
<DatePicker numberOfMonths={2} />
```

Display days as disabled.

```jsx
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
```

Disable weekends.

```jsx
<DatePicker
  initialMonth={new Date(2017, 3)}
  disabledDays={[new Date(2017, 3, 12), { daysOfWeek: [0, 6] }]}
/>
```

Display days as selected.

```jsx
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
```

Display a range of days.

```jsx
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
```

Select days on mouse enter.

```jsx
import React from 'react';
import { DateUtils } from 'react-day-picker';
import DateTime from '../DateTime';
import Spacing from '../Spacing';
import Text from '../Text';

class DatePickerMouseRangeSelectDemo extends React.Component {
  constructor(props) {
    super(props);

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: null,
      to: null,
      enteredTo: null, // Keep track of the last day for mouseEnter.
    };
  }

  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;

    return !from || isBeforeFirstDay || isRangeSelected;
  }

  handleDayClick(day) {
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
  }

  handleDayMouseEnter(day) {
    const { from, to } = this.state;

    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { before: this.state.from };
    const selectedDays = [from, { from, to: enteredTo }];

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
            fromMonth={from}
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

<DatePickerMouseRangeSelectDemo />;
```
