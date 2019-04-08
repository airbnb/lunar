import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '@airbnb/lunar/lib/components/Button';
import ButtonGroup from '@airbnb/lunar/lib/components/ButtonGroup';
import FormActions from '@airbnb/lunar/lib/components/FormActions';
import Text from '@airbnb/lunar/lib/components/Text';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Input from './Form/Input';
import TextArea from './Form/TextArea';
import Select from './Form/Select';
import Autocomplete from './Form/Autocomplete';
import Switch from './Form/Switch';
import CheckBox from './Form/CheckBox';
import CheckBoxController from './Form/CheckBoxController';
import RadioButtonController from './Form/RadioButtonController';
import ToggleButtonController from './Form/ToggleButtonController';
import DatePickerInput from './Form/DatePickerInput';
import DateTimeSelect from './Form/DateTimeSelect';
import Multicomplete from './Form/Multicomplete';
import Form from './Form';

function isRequired(value: any) {
  const pass = Array.isArray(value) ? value.length : value;

  if (!pass) {
    throw new Error('Field is required.');
  }
}

function isEmail(value: string) {
  isRequired(value);

  if (!value.includes('@')) {
    throw new Error('Invalid email address.');
  }
}

function isDate(value: string) {
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

class UnmountExample extends React.Component<{}, { mounted: boolean }> {
  state = {
    mounted: true,
  };

  handleToggleMount = () => {
    this.setState(prevState => ({
      mounted: !prevState.mounted,
    }));
  };

  render() {
    const { mounted } = this.state;

    return (
      <Form
        onFailedSubmit={action('onFailedSubmit')}
        onSubmit={action('onSubmit')}
        onStateUpdate={action('onStateUpdate')}
      >
        {mounted && (
          <Input
            label="Prefills other field on change"
            name="text_base"
            onChange={action('onChange')}
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
          onChange={action('onChange')}
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

storiesOf('Forms/Form', module)
  .add('With all fields.', () => (
    <Form
      initialValues={values}
      onFailedSubmit={action('onFailedSubmit')}
      onSubmit={action('onSubmit')}
      onStateUpdate={action('onStateUpdate')}
    >
      <Input
        label="Text"
        name="text[base]"
        // Set as an initial value
        // defaultValue="Lunar"
        onChange={action('onChange')}
        validator={isRequired}
        unregisterOnUnmount
      />

      <Input
        label="Email"
        name="text[email]"
        type="email"
        defaultValue="lunar@domain.com"
        onChange={action('onChange')}
        validator={isEmail}
        validateDefaultValue
        unregisterOnUnmount
      />

      <TextArea
        label="Textarea"
        name="textarea"
        defaultValue="Type something..."
        onChange={action('onChange')}
        validator={isRequired}
        autoResize
        important
        unregisterOnUnmount
      />

      <Select
        label="Select"
        name="select"
        defaultValue="foo"
        onChange={action('onChange')}
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
        onChange={action('onChange')}
        validator={isRequired}
        unregisterOnUnmount
      />

      <DatePickerInput
        label="Date picker"
        name="date"
        onChange={action('onChange')}
        validator={isDate}
        unregisterOnUnmount
      />

      <Autocomplete
        accessibilityLabel="Autocomplete"
        label="Autocomplete"
        name="autocomplete"
        defaultValue="black"
        onChange={action('onChange')}
        onLoadOptions={value =>
          Promise.resolve(items.filter(item => item.name.toLowerCase().match(value))) as any
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
        onChange={action('onChange')}
        onLoadOptions={value =>
          Promise.resolve(items.filter(item => item.name.toLowerCase().match(value))) as any
        }
        renderItem={(item: any, highlighted, selected) => <Text bold={selected}>{item.name}</Text>}
        validator={isRequired}
        unregisterOnUnmount
      />

      <Switch
        label="Switch"
        name="switch"
        onChange={action('onChange')}
        validator={isRequired}
        unregisterOnUnmount
      />

      <CheckBox
        label="Single checkbox"
        name="single_checkbox"
        onChange={action('onChange')}
        validator={isRequired}
        unregisterOnUnmount
      />

      <CheckBoxController
        label="Checkboxes"
        name="multiple_checkbox"
        defaultValue={['foo', 'baz']}
        onChange={action('onChange')}
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
                  <LoremIpsum medium />
                </Text>
              }
              topAlign
            />

            <CB
              value="bar"
              label="Bar"
              labelDescription={
                <Text muted>
                  <LoremIpsum medium />
                </Text>
              }
              topAlign
            />

            <CB
              value="baz"
              label="Baz"
              labelDescription={
                <Text muted>
                  <LoremIpsum medium />
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
        onChange={action('onChange')}
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
        onChange={action('onChange')}
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
    </Form>
  ))
  .add('Testing side-effects.', () => <UnmountExample />);
