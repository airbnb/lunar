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
      <Input
        disabled
        name="disabled-input"
        label="Input"
        onChange={() => console.log('onChange')}
      />

      <Select
        disabled
        name="disabled-select"
        label="Select"
        onChange={() => console.log('onChange')}
      >
        <option value="">Option</option>
      </Select>

      <TextArea
        disabled
        name="disabled-textarea"
        label="Textarea"
        onChange={() => console.log('onChange')}
      />
    </>
  );
}

supportsADisabledState.story = {
  name: 'Supports a disabled state.',
};

export function supportsAnInvalidErrorState() {
  return (
    <>
      <Input invalid name="invalid-input" label="Input" onChange={() => console.log('onChange')} />

      <Select invalid name="invalid-select" label="Select" onChange={() => console.log('onChange')}>
        <option value="">Option</option>
      </Select>

      <TextArea
        invalid
        name="invalid-textarea"
        label="Textarea"
        errorMessage="With an optional error message."
        onChange={() => console.log('onChange')}
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
        onChange={() => console.log('onChange')}
      />

      <Select
        name="prefix-select"
        label="Select"
        prefix={
          <Prefix>
            <IconCurrency decorative size="1.25em" />
          </Prefix>
        }
        onChange={() => console.log('onChange')}
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
        onChange={() => console.log('onChange')}
      />

      <Select
        name="suffix-select"
        label="Select"
        suffix={
          <Suffix>
            <IconTranslate decorative size="1.25em" />
          </Suffix>
        }
        onChange={() => console.log('onChange')}
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
        onChange={() => console.log('onChange')}
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
        onChange={() => console.log('onChange')}
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
        onChange={() => console.log('onChange')}
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
        onChange={() => console.log('onChange')}
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
      <Input inline name="disabled-input" label="Input" onChange={() => console.log('onChange')} />

      <Select inline name="disabled-select" label="Select" onChange={() => console.log('onChange')}>
        <option value="">Option</option>
      </Select>

      <TextArea
        inline
        name="disabled-textarea"
        label="Textarea"
        onChange={() => console.log('onChange')}
      />
    </>
  );
}

supportsInline.story = {
  name: 'Supports inline.',
};

export function smallAndLargeSizes() {
  return (
    <>
      <Input small name="size-small" label="Small" onChange={() => console.log('onChange')} />

      <Select name="size-normal" label="Medium (normal)" onChange={() => console.log('onChange')}>
        <option value="">Option</option>
      </Select>

      <TextArea large name="size-large" label="Large" onChange={() => console.log('onChange')} />
    </>
  );
}

smallAndLargeSizes.story = {
  name: 'Small and large sizes.',
};
