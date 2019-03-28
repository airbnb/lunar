A rudimentary example of all fields available to `Form`.

```jsx
import Button from ':core/components/Button';
import ButtonGroup from ':core/components/ButtonGroup';
import FormActions from ':core/components/FormActions';
import Text from ':core/components/Text';
import Form from './index';
import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';
import Autocomplete from './Autocomplete';
import Switch from './Switch';
import CheckBox from './CheckBox';
import CheckBoxController from './CheckBoxController';
import RadioButtonController from './RadioButtonController';
import ToggleButtonController from './ToggleButtonController';
import DatePickerInput from './DatePickerInput';
import DateTimeSelect from './DateTimeSelect';
import Multicomplete from './Multicomplete';

function isRequired(value) {
  const pass = Array.isArray(value) ? value.length : value;

  if (!pass) {
    throw new Error('Field is required.');
  }
}

function isEmail(value) {
  isRequired(value);

  if (!value.includes('@')) {
    throw new Error('Invalid email address.');
  }
}

function isDate(value) {
  isRequired(value);

  if (!value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    throw new Error('Invalid date.');
  }
}

const items = [
  { value: 'red', name: 'Red' },
  { value: 'black', name: 'Black' },
  { value: 'blue', name: 'Blue' },
  { value: 'green', name: 'Green' },
];

const values = {
  text: { base: 'Lunar' },
  multicomplete: ['red', 'green'],
};

<Form
  initialValues={values}
  onFailedSubmit={debug('onFailedSubmit')}
  onSubmit={debug('onSubmit')}
  onStateUpdate={debug('onStateUpdate')}
>
  <Input
    label="Text"
    name="text[base]"
    // Set as an initial value
    // defaultValue="Lunar"
    onChange={debug('onChange')}
    validator={isRequired}
    unregisterOnUnmount
  />

  <Input
    label="Email"
    name="text[email]"
    type="email"
    defaultValue="lunar@domain.com"
    onChange={debug('onChange')}
    validator={isEmail}
    validateDefaultValue
    unregisterOnUnmount
  />

  <TextArea
    label="Textarea"
    name="textarea"
    defaultValue="Lorem ipsum..."
    onChange={debug('onChange')}
    validator={isRequired}
    autoResize
    important
    unregisterOnUnmount
  />

  <Select
    label="Select"
    name="select"
    defaultValue="foo"
    onChange={debug('onChange')}
    validator={isRequired}
    unregisterOnUnmount
  >
    <option value="">---</option>
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
    <option value="baz">Baz</option>
  </Select>

  <DateTimeSelect
    label="Datetime select"
    name="datetime"
    onChange={debug('onChange')}
    validator={isRequired}
    unregisterOnUnmount
  />

  <DatePickerInput
    label="Date picker"
    name="date"
    onChange={debug('onChange')}
    validator={isDate}
    unregisterOnUnmount
  />

  <Autocomplete
    accessibilityLabel="Autocomplete"
    label="Autocomplete"
    name="autocomplete"
    defaultValue="black"
    onChange={debug('onChange')}
    onLoadOptions={value =>
      Promise.resolve(items.filter(item => item.name.toLowerCase().match(value)))
    }
    validator={isRequired}
    unregisterOnUnmount
  />

  <Multicomplete
    optional
    accessibilityLabel="Multicomplete"
    label="Multicomplete"
    name="multicomplete"
    // defaultValue={['blue', 'red']}
    onChange={debug('onChange')}
    onLoadOptions={value =>
      Promise.resolve(items.filter(item => item.name.toLowerCase().match(value)))
    }
    renderItem={(item, highlighted, selected) => <Text bold={selected}>{item.name}</Text>}
    validator={isRequired}
    unregisterOnUnmount
  />

  <Switch
    label="Switch"
    name="switch"
    onChange={debug('onChange')}
    validator={isRequired}
    unregisterOnUnmount
  />

  <CheckBox
    label="Single checkbox"
    name="single_checkbox"
    onChange={debug('onChange')}
    validator={isRequired}
    unregisterOnUnmount
  />

  <CheckBoxController
    label="Checkboxes"
    name="multiple_checkbox"
    defaultValue={['foo', 'baz']}
    onChange={debug('onChange')}
    validator={isRequired}
    unregisterOnUnmount
  >
    {CB => (
      <div>
        <CB
          value="foo"
          label="Foo"
          labelDescription={
            <Text muted>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
              porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat
              lorem vitae augue blandit, sed mollis mi laoreet.
            </Text>
          }
          topAlign
        />

        <CB
          value="bar"
          label="Bar"
          labelDescription={
            <Text muted>
              Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a rutrum dolor quam
              eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat. Fusce at
              fermentum velit.
            </Text>
          }
          topAlign
        />

        <CB
          value="baz"
          label="Baz"
          labelDescription={
            <Text muted>
              Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat
              volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh
              aliquam bibendum.
            </Text>
          }
          topAlign
        />
      </div>
    )}
  </CheckBoxController>

  <RadioButtonController
    label="Radio buttons (in button mode)"
    name="multiple_radio"
    defaultValue="foo"
    onChange={debug('onChange')}
    validator={isRequired}
    unregisterOnUnmount
  >
    {RB => (
      <div>
        <RB value="foo" label="Foo" button />
        <RB value="bar" label="Bar" button />
        <RB value="baz" label="Baz" button />
      </div>
    )}
  </RadioButtonController>

  <ToggleButtonController
    label="Toggle buttons"
    name="mutliple_buttons"
    defaultValue="foo"
    onChange={debug('onChange')}
    validator={isRequired}
    unregisterOnUnmount
  >
    {B => (
      <ButtonGroup>
        <B value="foo">Foo</B>
        <B value="bar">Bar</B>
        <B value="baz">Baz</B>
      </ButtonGroup>
    )}
  </ToggleButtonController>

  <br />
  <br />

  <FormActions showReset />
</Form>;
```

Testing effects of unmounting, unregistering, and batching.

```jsx
import Button from ':core/components/Button';
import Form from './index';
import Input from './Input';

function isRequired(value) {
  const pass = Array.isArray(value) ? value.length : value;

  if (!pass) {
    throw new Error('Field is required.');
  }
}

class UnmountExample extends React.Component {
  constructor() {
    super();

    this.state = {
      mounted: true,
    };

    this.handleToggleMount = this.handleToggleMount.bind(this);
  }

  handleToggleMount() {
    this.setState(prevState => ({
      mounted: !prevState.mounted,
    }));
  }

  render() {
    const { mounted } = this.state;

    return (
      <Form
        onFailedSubmit={debug('onFailedSubmit')}
        onSubmit={debug('onSubmit')}
        onStateUpdate={debug('onStateUpdate')}
      >
        {mounted && (
          <Input
            label="Prefills other field on change"
            name="text_base"
            onChange={debug('onChange')}
            onBatchChange={() => ({
              text_other: 'Prefilled',
            })}
            validator={isRequired}
            unregisterOnUnmount
          />
        )}

        <Input
          label="Cannot be empty"
          name="text_other"
          onChange={debug('onChange')}
          validator={isRequired}
          unregisterOnUnmount
        />

        <Button onClick={this.handleToggleMount}>
          {mounted ? 'Unmount Input' : 'Mount Input'}
        </Button>
      </Form>
    );
  }
}

<UnmountExample />;
```
