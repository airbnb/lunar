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

export function supportsBothAPrefixAndSuffixAndASmallState() {
  return (
    <>
      <Input
        small
        name="both-input"
        label="Input"
        prefix={<Prefix small>http://</Prefix>}
        suffix={<Suffix small>.com</Suffix>}
        onChange={action('onChange')}
      />

      <TextArea
        small
        disabled
        name="both-textarea"
        label="TextArea"
        prefix={
          <Prefix small disabled>
            Hello
          </Prefix>
        }
        suffix={
          <Suffix small disabled>
            Goodbye
          </Suffix>
        }
        onChange={action('onChange')}
      />
    </>
  );
}

supportsBothAPrefixAndSuffixAndASmallState.story = {
  name: 'Supports both a prefix and suffix in a small state.',
};

export function supportsBothAPrefixAndSuffixAndALargeState() {
  return (
    <>
      <Input
        large
        name="both-input"
        label="Input"
        prefix={<Prefix large>http://</Prefix>}
        suffix={<Suffix large>.com</Suffix>}
        onChange={action('onChange')}
      />

      <TextArea
        large
        disabled
        name="both-textarea"
        label="TextArea"
        prefix={
          <Prefix large disabled>
            Hello
          </Prefix>
        }
        suffix={
          <Suffix large disabled>
            Goodbye
          </Suffix>
        }
        onChange={action('onChange')}
      />
    </>
  );
}

supportsBothAPrefixAndSuffixAndALargeState.story = {
  name: 'Supports both a prefix and suffix in a large state.',
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

export function smallAndLargeSizes() {
  return (
    <>
      <Input small name="size-small" label="Small" onChange={action('onChange')} />

      <Select name="size-normal" label="Medium (normal)" onChange={action('onChange')}>
        <option value="">Option</option>
      </Select>

      <TextArea large name="size-large" label="Large" onChange={action('onChange')} />
    </>
  );
}

smallAndLargeSizes.story = {
  name: 'Small and large sizes.',
};
