Display a single month.

```jsx
<DatePickerInput name="date" label="Label" onChange={debug('onChange')} />
```

Display a custom format.

```jsx
<DatePickerInput name="date" label="Label" onChange={debug('onChange')} format="yyyy-MM-dd" />
```

Display with no label.

```jsx
<DatePickerInput name="date" label="Label" onChange={debug('onChange')} hideLabel />
```

Display with inline label.

```jsx
<DatePickerInput name="date" label="Label" onChange={debug('onChange')} inline />
```

Display with dropdown right aligned.

```jsx
<DatePickerInput
  name="date"
  label="Label"
  onChange={debug('onChange')}
  dropdownProps={{ right: 0 }}
/>
```

With an error message in an invalid state.

```jsx
<DatePickerInput
  name="input-error"
  label="Label"
  onChange={debug('onChange')}
  errorMessage="This field is required."
  invalid
/>
```

With a label description in a disabled state.

```jsx
<DatePickerInput
  name="input-disabled"
  label="Label"
  labelDescription="This is a small label description."
  onChange={debug('onChange')}
  disabled
/>
```

Range with two inputs.

```jsx
import createDateTime from '../../utils/createDateTime';
import Spacing from '../Spacing';

class DatePickerInputDemo extends React.Component {
  constructor(props) {
    super(props);

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleToInputRef = this.handleToInputRef.bind(this);

    this.state = {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick() {
    setTimeout(() => this.toRef && this.toRef.focus(), 0);
  }

  handleFromChange(from) {
    this.setState({ from: createDateTime(from, { sourceFormat: 'MM/dd/yyyy' }).toJSDate() });
  }

  handleToChange(to) {
    this.setState({ to: createDateTime(to, { sourceFormat: 'MM/dd/yyyy' }).toJSDate() });
  }

  handleToInputRef(ref) {
    this.toRef = ref;
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <div>
        <Spacing inline right={2}>
          <DatePickerInput
            hideLabel
            label="From"
            name="from-date"
            onChange={this.handleFromChange}
            placeholder="Start date"
            value={from}
            datePickerProps={{
              disabledDays: { after: to },
              modifiers,
              month: new Date(),
              toMonth: to,
              selectedDays: [to, from, { from, to }],
              onDayClick: this.handleDayClick,
            }}
          />
        </Spacing>

        <Spacing inline>
          <DatePickerInput
            hideLabel
            label="To"
            name="to-date"
            onChange={this.handleToChange}
            wrappedRef={this.handleToInputRef}
            placeholder="End date"
            value={to}
            datePickerProps={{
              disabledDays: { before: from },
              fromMonth: from,
              modifiers,
              month: from,
              selectedDays: [to, from, { from, to }],
            }}
          />
        </Spacing>
      </div>
    );
  }
}

<DatePickerInputDemo />;
```
