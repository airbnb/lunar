A standard select field for dates and times.

```jsx
<DateTimeSelect name="dts-basic" label="Label" onChange={debug('onChange')} />
```

With a compact smaller view.

```jsx
<DateTimeSelect name="dts-compact" label="Compact" onChange={debug('onChange')} compact />
<DateTimeSelect name="dts-regular" label="Regular" onChange={debug('onChange')} />
```

With an invalid state.

```jsx
<DateTimeSelect name="dts-invalid" label="Label" onChange={debug('onChange')} invalid />
```

With a disabled state and label description.

```jsx
<DateTimeSelect
  name="dts-disabled"
  label="Label"
  labelDescription="Please choose a date"
  onChange={debug('onChange')}
  disabled
/>
```

With the year hidden.

```jsx
<DateTimeSelect name="dts-noyear" label="No year" onChange={debug('onChange')} hideYear />
```

Or all dates hidden.

```jsx
<DateTimeSelect name="dts-nodate" label="Time" onChange={debug('onChange')} hideDate />
```

Or all times hidden.

```jsx
<DateTimeSelect name="dts-notime" label="Date" onChange={debug('onChange')} hideTime />
```

With 12-hour days instead of 24.

```jsx
<DateTimeSelect
  name="dts-12"
  label="12-hour clock"
  onChange={debug('onChange')}
  enable12HourClock
/>
```

Display with inline label.

```jsx
<DateTimeSelect name="dts-notime" label="Date" onChange={debug('onChange')} hideTime inline />
```
