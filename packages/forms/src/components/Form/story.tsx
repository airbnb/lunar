import React from 'react';
import Button from '@airbnb/lunar/lib/components/Button';
import ButtonGroup from '@airbnb/lunar/lib/components/ButtonGroup';
import Text from '@airbnb/lunar/lib/components/Text';
import LoremIpsum from ':storybook/components/LoremIpsum';
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
import Range from './Range';
import FormActions from '../FormActions';
import Form from '.';

const fixedDate = new Date(2019, 1, 1, 10, 10, 10);

function isRequired(value: unknown) {
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

function isDate(value: string | Date) {
  isRequired(value);

  // eslint-disable-next-line unicorn/better-regex
  if (typeof value === 'string' && !value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
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
    this.setState((prevState) => ({
      mounted: !prevState.mounted,
    }));
  };

  render() {
    const { mounted } = this.state;

    return (
      <Form
        onFailedSubmit={() => console.log('onFailedSubmit')}
        onSubmit={(data) => {
          action('onSubmit')(data);

          return Promise.resolve();
        }}
        onStateUpdate={() => console.log('onStateUpdate')}
      >
        {mounted && (
          <Input
            unregisterOnUnmount
            label="Prefills other field on change"
            name="text_base"
            validator={isRequired}
            onChange={() => console.log('onChange')}
            onBatchChange={() => ({
              text_other: 'Prefilled',
            })}
          />
        )}

        <Input
          unregisterOnUnmount
          label="Cannot be empty"
          name="text_other"
          validator={isRequired}
          onChange={() => console.log('onChange')}
        />

        <Button onClick={this.handleToggleMount}>
          {mounted ? 'Unmount Input' : 'Mount Input'}
        </Button>
      </Form>
    );
  }
}

export default {
  title: 'Forms/Form',
  parameters: {
    inspectComponents: [Form],
  },
};

export function withAllFields() {
  return (
    <Form
      initialValues={values}
      onFailedSubmit={() => console.log('onFailedSubmit')}
      onSubmit={(data) => {
        action('onSubmit')(data);

        return Promise.resolve();
      }}
      onStateUpdate={() => console.log('onStateUpdate')}
    >
      <Input
        unregisterOnUnmount
        label="Text"
        // Set as an initial value
        // defaultValue="Lunar"
        name="text[base]"
        validator={isRequired}
        onChange={() => console.log('onChange')}
      />

      <Input
        validateDefaultValue
        unregisterOnUnmount
        label="Email"
        name="text[email]"
        type="email"
        defaultValue="lunar@domain.com"
        validator={isEmail}
        onChange={() => console.log('onChange')}
      />

      <TextArea
        autoResize
        important
        unregisterOnUnmount
        label="Textarea"
        name="textarea"
        defaultValue="Type something..."
        validator={isRequired}
        onChange={() => console.log('onChange')}
      />

      <Select
        unregisterOnUnmount
        label="Select"
        name="select"
        defaultValue="foo"
        validator={isRequired}
        onChange={() => console.log('onChange')}
      >
        <option value="">---</option>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
        <option value="baz">Baz</option>
      </Select>

      <DateTimeSelect
        unregisterOnUnmount
        label="Datetime select"
        name="datetime"
        validator={isRequired}
        defaultValue={fixedDate.toISOString()}
        onChange={() => console.log('onChange')}
      />

      <DatePickerInput
        unregisterOnUnmount
        label="Date picker"
        name="date"
        validator={isDate}
        defaultValue={fixedDate}
        onChange={() => console.log('onChange')}
      />

      <Autocomplete
        unregisterOnUnmount
        accessibilityLabel="Autocomplete"
        label="Autocomplete"
        name="autocomplete"
        defaultValue="black"
        validator={isRequired}
        onChange={() => console.log('onChange')}
        onLoadItems={(value) =>
          Promise.resolve(items.filter((item) => item.name.toLowerCase().match(value)))
        }
      />

      <Multicomplete
        optional
        unregisterOnUnmount
        accessibilityLabel="Multicomplete"
        label="Multicomplete"
        // defaultValue={['blue', 'red']}
        name="multicomplete"
        renderItem={(item, highlighted, selected) => <Text bold={selected}>{item.name}</Text>}
        validator={isRequired}
        onChange={() => console.log('onChange')}
        onLoadItems={(value) =>
          Promise.resolve(items.filter((item) => item.name.toLowerCase().match(value)))
        }
      />

      <Switch
        unregisterOnUnmount
        label="Switch"
        name="switch"
        validator={isRequired}
        onChange={() => console.log('onChange')}
      />

      <CheckBox
        unregisterOnUnmount
        label="Single checkbox"
        name="single_checkbox"
        validator={isRequired}
        onChange={() => console.log('onChange')}
      />

      <CheckBoxController<'foo' | 'bar' | 'baz'>
        unregisterOnUnmount
        label="Checkboxes"
        name="multiple_checkbox"
        defaultValue={['foo', 'baz']}
        validator={isRequired}
        onChange={() => console.log('onChange')}
      >
        {(CB) => (
          <div>
            <CB
              value="foo"
              label="Foo"
              labelDescription={
                <Text muted>
                  <LoremIpsum medium />
                </Text>
              }
            />

            <CB
              value="bar"
              label="Bar"
              labelDescription={
                <Text muted>
                  <LoremIpsum medium />
                </Text>
              }
            />

            <CB
              value="baz"
              label="Baz"
              labelDescription={
                <Text muted>
                  <LoremIpsum medium />
                </Text>
              }
            />
          </div>
        )}
      </CheckBoxController>

      <RadioButtonController<'foo' | 'bar' | 'baz'>
        unregisterOnUnmount
        label="Radio buttons (in button mode)"
        name="multiple_radio"
        defaultValue="foo"
        validator={isRequired}
        onChange={() => console.log('onChange')}
      >
        {(RB) => (
          <div>
            <RB button value="foo" label="Foo" />
            <RB button value="bar" label="Bar" />
            <RB button value="baz" label="Baz" />
          </div>
        )}
      </RadioButtonController>

      <ToggleButtonController<'foo' | 'bar' | 'baz'>
        unregisterOnUnmount
        label="Toggle buttons"
        name="mutliple_buttons"
        defaultValue="foo"
        validator={isRequired}
        onChange={() => console.log('onChange')}
      >
        {(B) => (
          <ButtonGroup>
            <B value="foo">Foo</B>
            <B value="bar">Bar</B>
            <B value="baz">Baz</B>
          </ButtonGroup>
        )}
      </ToggleButtonController>

      <Range
        unregisterOnUnmount
        alwaysShowTooltip
        label="Range slider"
        name="range_slider"
        validator={isRequired}
        // set a default
        // defaultValue={2}
        min={0}
        max={10}
      />

      <br />
      <br />

      <FormActions showReset />
    </Form>
  );
}

withAllFields.story = {
  name: 'With all fields.',
};

export function testingSideEffects() {
  return <UnmountExample />;
}

testingSideEffects.story = {
  name: 'Testing side-effects.',
};
