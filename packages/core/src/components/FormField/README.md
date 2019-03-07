Internally powers `Input`, `TextArea`, `RadioButton`, `CheckBox`, `Select`, and other form fields.
Should rarely be used directly, and instead should be used to compose additional and or specialized
form fields.

Supports a disabled state.

```jsx
import Input from '../Input';
import Select from '../Select';
import TextArea from '../TextArea';

<div>
  <Input name="disabled-input" label="Input" onChange={debug('onChange')} disabled />

  <Select name="disabled-select" label="Select" onChange={debug('onChange')} disabled>
    <option value="">Option</option>
  </Select>

  <TextArea name="disabled-textarea" label="Textarea" onChange={debug('onChange')} disabled />
</div>;
```

Supports an invalid error state.

```jsx
import Input from '../Input';
import Select from '../Select';
import TextArea from '../TextArea';

<div>
  <Input name="invalid-input" label="Input" onChange={debug('onChange')} invalid />

  <Select name="invalid-select" label="Select" onChange={debug('onChange')} invalid>
    <option value="">Option</option>
  </Select>

  <TextArea
    name="invalid-textarea"
    label="Textarea"
    onChange={debug('onChange')}
    invalid
    errorMessage="With an optional error message."
  />
</div>;
```

Supports a prefx.

```jsx
import IconCurrency from ':icons/general/IconCurrency';
import Input from '../Input';
import Select from '../Select';
import Prefix from './Prefix';

<div>
  <Input
    name="prefix-input"
    label="Input"
    prefix={<Prefix>http://</Prefix>}
    onChange={debug('onChange')}
  />

  <Select
    name="prefix-select"
    label="Select"
    prefix={
      <Prefix>
        <IconCurrency decorative size="1.25em" />
      </Prefix>
    }
    onChange={debug('onChange')}
  >
    <option value="">USD</option>
  </Select>
</div>;
```

Supports a suffix.

```jsx
import IconTranslate from ':icons/interface/IconTranslate';
import Input from '../Input';
import Select from '../Select';
import Suffix from './Suffix';

<div>
  <Input
    name="suffix-input"
    label="Input"
    suffix={<Suffix>.com</Suffix>}
    onChange={debug('onChange')}
  />

  <Select
    name="suffix-select"
    label="Select"
    suffix={
      <Suffix>
        <IconTranslate decorative size="1.25em" />
      </Suffix>
    }
    onChange={debug('onChange')}
  >
    <option value="">English</option>
  </Select>
</div>;
```

Supports both a prefix and suffix, and a compact state.

```jsx
import Prefix from './Prefix';
import Suffix from './Suffix';
import Input from '../Input';
import TextArea from '../TextArea';

<div>
  <Input
    name="both-input"
    label="Input"
    prefix={<Prefix compact>http://</Prefix>}
    suffix={<Suffix compact>.com</Suffix>}
    onChange={debug('onChange')}
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
    onChange={debug('onChange')}
    compact
    disabled
  />
</div>;
```

Supports inline.

```jsx
import Input from '../Input';
import Select from '../Select';
import TextArea from '../TextArea';

<div>
  <Input name="disabled-input" label="Input" onChange={debug('onChange')} inline />

  <Select name="disabled-select" label="Select" onChange={debug('onChange')} inline>
    <option value="">Option</option>
  </Select>

  <TextArea name="disabled-textarea" label="Textarea" onChange={debug('onChange')} inline />
</div>;
```
