import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Spacing from './Spacing';
import DatePickerInput from './DatePickerInput';
import DatePicker from './DatePicker';

type State = { from: Date | null; to?: Date | null };

class DatePickerInputDemo extends React.Component<{}, State> {
  state: State = {
    from: null,
    to: null,
  };

  ref = React.createRef<HTMLInputElement>();

  handleDayClick = () => {
    window.setTimeout(() => this.ref.current && this.ref.current.focus(), 0);
  };

  handleFromChange = (value: string, from: Date | null) => {
    this.setState({ from });
  };

  handleToChange = (value: string, to: Date | null) => {
    this.setState({ to });
  };

  render() {
    const { from, to } = this.state;
    const modifiers = from && to ? { start: from, end: to } : undefined;

    return (
      <div>
        <Spacing inline right={2}>
          <DatePickerInput
            hideLabel
            label="From"
            name="from-date"
            placeholder="Start date"
            value={from || undefined}
            datePickerProps={{
              disabledDays: to ? { after: to } : undefined,
              modifiers,
              month: new Date(),
              toMonth: to || undefined,
              selectedDays: from && to ? [to, from, { from, to }] : undefined,
              onDayClick: this.handleDayClick,
            }}
            onChange={this.handleFromChange}
          />
        </Spacing>

        <Spacing inline>
          <DatePickerInput
            hideLabel
            label="To"
            name="to-date"
            propagateRef={this.ref}
            placeholder="End date"
            value={to || undefined}
            datePickerProps={{
              disabledDays: from ? { before: from } : undefined,
              fromMonth: from || undefined,
              modifiers,
              month: from || undefined,
              selectedDays: from && to ? [to, from, { from, to }] : undefined,
            }}
            onChange={this.handleToChange}
          />
        </Spacing>
      </div>
    );
  }
}

storiesOf('Core/DatePickerInput', module)
  .addParameters({
    inspectComponents: [DatePickerInput, DatePicker],
  })
  .add('A single month.', () => (
    <DatePickerInput
      name="date"
      label="Label"
      datePickerProps={{
        onMonthChange: action('onMonthChange'),
      }}
      onChange={action('onChange')}
    />
  ))
  .add('A custom format.', () => (
    <DatePickerInput
      name="date"
      label="Label"
      format="yyyy-MM-dd"
      datePickerProps={{
        onMonthChange: action('onMonthChange'),
      }}
      onChange={action('onChange')}
    />
  ))
  .add('With no label.', () => (
    <DatePickerInput
      hideLabel
      name="date"
      label="Label"
      datePickerProps={{
        onMonthChange: action('onMonthChange'),
      }}
      onChange={action('onChange')}
    />
  ))
  .add('With inline label.', () => (
    <DatePickerInput
      inline
      name="date"
      label="Label"
      datePickerProps={{
        onMonthChange: action('onMonthChange'),
      }}
      onChange={action('onChange')}
    />
  ))
  .add('With dropdown right aligned.', () => (
    <DatePickerInput
      name="date"
      label="Label"
      dropdownProps={{ right: 0 }}
      datePickerProps={{
        onMonthChange: action('onMonthChange'),
      }}
      onChange={action('onChange')}
    />
  ))
  .add('With an error message in an invalid state.', () => (
    <DatePickerInput
      invalid
      name="input-error"
      label="Label"
      errorMessage="This field is required."
      datePickerProps={{
        onMonthChange: action('onMonthChange'),
      }}
      onChange={action('onChange')}
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <DatePickerInput
      disabled
      name="input-disabled"
      label="Label"
      labelDescription="This is a small label description."
      datePickerProps={{
        onMonthChange: action('onMonthChange'),
      }}
      onChange={action('onChange')}
    />
  ))
  .add('Range with two inputs.', () => <DatePickerInputDemo />);
