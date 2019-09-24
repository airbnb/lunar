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
    this.setState(prevState => ({
      mounted: !prevState.mounted,
    }));
  };

  render() {
    const { mounted } = this.state;

    return (
      <Form
        onFailedSubmit={action('onFailedSubmit')}
        onSubmit={() => {
          action('onSubmit')();

          return Promise.resolve();
        }}
        onStateUpdate={action('onStateUpdate')}
      >
        {mounted && (
          <Input
            unregisterOnUnmount
            label="Prefills other field on change"
            name="text_base"
            validator={isRequired}
            onChange={action('onChange')}
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
          onChange={action('onChange')}
        />

        <Button onClick={this.handleToggleMount}>
          {mounted ? 'Unmount Input' : 'Mount Input'}
        </Button>
      </Form>
    );
  }
}

storiesOf('Forms/Form', module)
  .addParameters({
    inspectComponents: [Form],
  })
  .add('With all fields.', () => (
    <Form
      initialValues={values}
      onFailedSubmit={action('onFailedSubmit')}
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
      onStateUpdate={action('onStateUpdate')}
    >
      <Input
        unregisterOnUnmount
        label="Text"
        // Set as an initial value
        // defaultValue="Lunar"
        name="text[base]"
        validator={isRequired}
        onChange={action('onChange')}
      />

      <Input
        validateDefaultValue
        unregisterOnUnmount
        label="Email"
        name="text[email]"
        type="email"
        defaultValue="lunar@domain.com"
        validator={isEmail}
        onChange={action('onChange')}
      />

      <TextArea
        autoResize
        important
        unregisterOnUnmount
        label="Textarea"
        name="textarea"
        defaultValue="Type something..."
        validator={isRequired}
        onChange={action('onChange')}
      />

      <Select
        unregisterOnUnmount
        label="Select"
        name="select"
        defaultValue="foo"
        validator={isRequired}
        onChange={action('onChange')}
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
        onChange={action('onChange')}
      />

      <DatePickerInput
        unregisterOnUnmount
        label="Date picker"
        name="date"
        validator={isDate}
        defaultValue={fixedDate}
        onChange={action('onChange')}
      />

      <Autocomplete
        unregisterOnUnmount
        accessibilityLabel="Autocomplete"
        label="Autocomplete"
        name="autocomplete"
        defaultValue="black"
        validator={isRequired}
        onChange={action('onChange')}
        onLoadItems={value =>
          Promise.resolve(items.filter(item => item.name.toLowerCase().match(value)))
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
        onChange={action('onChange')}
        onLoadItems={value =>
          Promise.resolve(items.filter(item => item.name.toLowerCase().match(value)))
        }
      />

      <Switch
        unregisterOnUnmount
        label="Switch"
        name="switch"
        validator={isRequired}
        onChange={action('onChange')}
      />

      <CheckBox
        unregisterOnUnmount
        label="Single checkbox"
        name="single_checkbox"
        validator={isRequired}
        onChange={action('onChange')}
      />

      <CheckBoxController
        unregisterOnUnmount
        label="Checkboxes"
        name="multiple_checkbox"
        defaultValue={['foo', 'baz']}
        validator={isRequired}
        onChange={action('onChange')}
      >
        {CB => (
          <div>
            <CB
              topAlign
              value="foo"
              label="Foo"
              labelDescription={
                <Text muted>
                  <LoremIpsum medium />
                </Text>
              }
            />

            <CB
              topAlign
              value="bar"
              label="Bar"
              labelDescription={
                <Text muted>
                  <LoremIpsum medium />
                </Text>
              }
            />

            <CB
              topAlign
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

      <RadioButtonController
        unregisterOnUnmount
        label="Radio buttons (in button mode)"
        name="multiple_radio"
        defaultValue="foo"
        validator={isRequired}
        onChange={action('onChange')}
      >
        {RB => (
          <div>
            <RB button value="foo" label="Foo" />
            <RB button value="bar" label="Bar" />
            <RB button value="baz" label="Baz" />
          </div>
        )}
      </RadioButtonController>

      <ToggleButtonController
        unregisterOnUnmount
        label="Toggle buttons"
        name="mutliple_buttons"
        defaultValue="foo"
        validator={isRequired}
        onChange={action('onChange')}
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
