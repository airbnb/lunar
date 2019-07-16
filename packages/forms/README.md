# Lunar Forms

Provides a robust form management layer powered by
[final-form](https://github.com/final-form/final-form).

```bash static
yarn add @airbnb/lunar-forms
```

## Usage

The package provides a `Form` component, that utilizes React context and `final-form` to manage the
state of all fields within itself. To operate correctly, all field components provided in the `core`
package have an equivalent component in this package that automatically connects to the parent form
instance, they are: `Autocomplete`, `CheckBox`, `CheckBoxController`, `DatePickerInput`,
`DateTimeSelect`, `Input`, `RadioButtonController`, `Select`, `Switch`, `TextArea`, and much more.

```jsx static
import Form, { Input, Select } from '@airbnb/lunar-forms';

<Form onSubmit={this.handleSubmit}>
  <Input name="name" label="Name" />

  <Select name="fruit" label="Fruit">
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="orange">Orange</option>
    <option value="other">Other</option>
  </Select>
</Form>;
```
