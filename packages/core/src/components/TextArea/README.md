A standard textarea field.

```jsx
<TextArea name="textarea-basic" label="Label" onChange={debug('onChange')} />
```

With a compact smaller view.

```jsx
<TextArea name="textarea-compact" label="Compact" onChange={debug('onChange')} compact />
<TextArea name="textarea-regular" label="Regular" onChange={debug('onChange')} />
```

With an error message in an invalid state.

```jsx
<TextArea
  name="textarea-error"
  label="Label"
  onChange={debug('onChange')}
  errorMessage="This field is required."
  invalid
/>
```

With a label description in a disabled state.

```jsx
<TextArea
  name="textarea-disabled"
  label="Label"
  labelDescription="This is a small label description."
  onChange={debug('onChange')}
  disabled
/>
```

With a hidden label and different row height.

```jsx
<TextArea name="textarea-custom" label="Label" onChange={debug('onChange')} rows={5} hideLabel />
```

Marked as optional with a placeholder.

```jsx
<TextArea
  name="textarea-optional"
  label="Label"
  onChange={debug('onChange')}
  placeholder="Tell us how you feel..."
  optional
/>
```

Display with inline label and a prefix.

```jsx
import Prefix from '../FormField/Prefix';

<TextArea
  name="both-textarea"
  label="TextArea"
  prefix={<Prefix compact>Hello</Prefix>}
  onChange={debug('onChange')}
  inline
/>;
```

A textarea with built-in grammar and spelling checks, as well as a max character limit.

```jsx
function onCheckText() {
  return Promise.resolve({
    proofread: {
      matches: [
        {
          message: '',
          short_message: 'Uncapitalized',
          offset: 59,
          length: 2,
          replacements: ['Or'],
        },
        {
          message: '',
          short_message: 'Incorrect word',
          offset: 76,
          length: 3,
          replacements: ['to'],
        },
        {
          message: '',
          short_message: 'Typo',
          offset: 84,
          length: 2,
          replacements: ['a'],
        },
        {
          message: '',
          short_message: 'Double words',
          offset: 91,
          length: 5,
          replacements: ['of'],
        },
        {
          message: '',
          short_message: 'Typo',
          offset: 126,
          length: 6,
          replacements: ['detect'],
        },
        {
          message: '',
          short_message: 'Typo',
          offset: 146,
          length: 6,
          replacements: ['think'],
        },
        {
          message: '',
          short_message: 'Typo',
          offset: 181,
          length: 3,
          replacements: ['note'],
        },
      ],
    },
  });
}

class ProofreaderDemo extends React.Component {
  constructor() {
    super();

    this.state = {
      value:
        "Click the colored phrases for details on potential errors. or use this text too see an few of of the problems that Oxford can detecd. What do you thinks of grammar checkers? Please not that they are not perfect. Style issues get a blue marker: It's 5 P.M. in the afternoon.",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      value,
    });
  }

  render() {
    return (
      <TextArea
        autoResize
        proofread
        name="textarea-proofread"
        label="Proofread"
        onChange={this.handleChange}
        onCheckText={onCheckText}
        rows={5}
        maxLength={10000}
        value={this.state.value}
      />
    );
  }
}

<ProofreaderDemo />;
```
