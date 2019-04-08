import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconTranslate from '@airbnb/lunar-icons/lib/interface/IconTranslate';
import IconCurrency from '@airbnb/lunar-icons/lib/general/IconCurrency';
import Input from './Input';
import Select from './Select';
import TextArea from './TextArea';
import { Prefix, Suffix } from './FormField';

storiesOf('Core/FormField', module)
  .add('Supports a disabled state.', () => (
    <>
      <Input name="disabled-input" label="Input" onChange={action('onChange')} disabled />

      <Select name="disabled-select" label="Select" onChange={action('onChange')} disabled>
        <option value="">Option</option>
      </Select>

      <TextArea name="disabled-textarea" label="Textarea" onChange={action('onChange')} disabled />
    </>
  ))
  .add('Supports an invalid error state.', () => (
    <>
      <Input name="invalid-input" label="Input" onChange={action('onChange')} invalid />

      <Select name="invalid-select" label="Select" onChange={action('onChange')} invalid>
        <option value="">Option</option>
      </Select>

      <TextArea
        name="invalid-textarea"
        label="Textarea"
        onChange={action('onChange')}
        invalid
        errorMessage="With an optional error message."
      />
    </>
  ))
  .add('Supports a prefx.', () => (
    <>
      <Input
        name="prefix-input"
        label="Input"
        prefix={<Prefix>http://</Prefix>}
        onChange={action('onChange')}
      />

      <Select
        name="prefix-select"
        label="Select"
        prefix={
          <Prefix>
            <IconCurrency decorative size="1.25em" />
          </Prefix>
        }
        onChange={action('onChange')}
      >
        <option value="">USD</option>
      </Select>
    </>
  ))
  .add('Supports a suffix.', () => (
    <>
      <Input
        name="suffix-input"
        label="Input"
        suffix={<Suffix>.com</Suffix>}
        onChange={action('onChange')}
      />

      <Select
        name="suffix-select"
        label="Select"
        suffix={
          <Suffix>
            <IconTranslate decorative size="1.25em" />
          </Suffix>
        }
        onChange={action('onChange')}
      >
        <option value="">English</option>
      </Select>
    </>
  ))
  .add('Supports both a prefix and suffix, and a compact state.', () => (
    <>
      <Input
        name="both-input"
        label="Input"
        prefix={<Prefix compact>http://</Prefix>}
        suffix={<Suffix compact>.com</Suffix>}
        onChange={action('onChange')}
        compact
      />

      <TextArea
        name="both-textarea"
        label="TextArea"
        prefix={
          <Prefix compact disabled>
            Hello
          </Prefix>
        }
        suffix={
          <Suffix compact disabled>
            Goodbye
          </Suffix>
        }
        onChange={action('onChange')}
        compact
        disabled
      />
    </>
  ))
  .add('Supports inline.', () => (
    <>
      <Input name="disabled-input" label="Input" onChange={action('onChange')} inline />

      <Select name="disabled-select" label="Select" onChange={action('onChange')} inline>
        <option value="">Option</option>
      </Select>

      <TextArea name="disabled-textarea" label="Textarea" onChange={action('onChange')} inline />
    </>
  ));
