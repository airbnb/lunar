import React from 'react';
import IconTranslate from '@airbnb/lunar-icons/lib/interface/IconTranslate';
import IconCurrency from '@airbnb/lunar-icons/lib/general/IconCurrency';
import Input from '../Input';
import Select from '../Select';
import TextArea from '../TextArea';
import FormField, { Prefix, Suffix } from '.';

export default {
  title: 'Core/FormField',
  parameters: {
    inspectComponents: [FormField, Prefix, Suffix],
  },
};

export function supportsADisabledState() {
  return (
    <>
      <Input disabled name="disabled-input" label="Input" onChange={action('onChange')} />

      <Select disabled name="disabled-select" label="Select" onChange={action('onChange')}>
        <option value="">Option</option>
      </Select>

      <TextArea disabled name="disabled-textarea" label="Textarea" onChange={action('onChange')} />
    </>
  );
}

supportsADisabledState.story = {
  name: 'Supports a disabled state.',
};

export function supportsAnInvalidErrorState() {
  return (
    <>
      <Input invalid name="invalid-input" label="Input" onChange={action('onChange')} />

      <Select invalid name="invalid-select" label="Select" onChange={action('onChange')}>
        <option value="">Option</option>
      </Select>

      <TextArea
        invalid
        name="invalid-textarea"
        label="Textarea"
        errorMessage="With an optional error message."
        onChange={action('onChange')}
      />
    </>
  );
}

supportsAnInvalidErrorState.story = {
  name: 'Supports an invalid error state.',
};

export function supportsAPrefx() {
  return (
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
  );
}

supportsAPrefx.story = {
  name: 'Supports a prefx.',
};

export function supportsASuffix() {
  return (
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
  );
}

supportsASuffix.story = {
  name: 'Supports a suffix.',
};

export function supportsBothAPrefixAndSuffixAndACompactState() {
  return (
    <>
      <Input
        compact
        name="both-input"
        label="Input"
        prefix={<Prefix compact>http://</Prefix>}
        suffix={<Suffix compact>.com</Suffix>}
        onChange={action('onChange')}
      />

      <TextArea
        compact
        disabled
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
      />
    </>
  );
}

supportsBothAPrefixAndSuffixAndACompactState.story = {
  name: 'Supports both a prefix and suffix, and a compact state.',
};

export function supportsInline() {
  return (
    <>
      <Input inline name="disabled-input" label="Input" onChange={action('onChange')} />

      <Select inline name="disabled-select" label="Select" onChange={action('onChange')}>
        <option value="">Option</option>
      </Select>

      <TextArea inline name="disabled-textarea" label="Textarea" onChange={action('onChange')} />
    </>
  );
}

supportsInline.story = {
  name: 'Supports inline.',
};
