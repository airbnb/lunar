import {
  IsEqual,
  FormState,
  FieldState,
  FieldSubscriber,
  FieldSubscription,
  FieldValidator,
  Unsubscribe,
} from 'final-form';

// value:
// string - Autocomplete, DatePickerInput, DateTimeSelect, FileInput, Input, RadioButton, RadioButtonController, Select, TextArea, ToggleButtonController
// string[] - CheckBoxController, Multicomplete
// boolean - CheckBox, Switch

// onChange:
// string - Autocomplete, DatePickerInput, DateTimeSelect, Input, RadioButtonController, Select, TextArea, ToggleButtonController
// string[] - CheckBoxController, Multicomplete
// boolean - CheckBox, RadioButton, Switch
// File[] - FileInput3

export type Context = {
  change: (name: string, value: any, batchValues?: object) => void;
  getFields: () => FieldState<any>[];
  getState: () => FormState<any>;
  register: (field: Field, onUpdate: FieldSubscriber<any>) => Unsubscribe;
  submit: () => Promise<object | undefined>;
};

export type Errors = {
  [key: string]: string;
};

export type Parse = (value: FieldInput) => string | boolean;

// Value coming in via `defaultValue`
export type FieldInput = boolean | string | number | string[] | number[] | null | undefined;

// Value passed down to `value`
export type FieldOutput = string | string[] | boolean;

// Value passed as the 1st argument to `onChange`
export type OnChangeValue = string | string[] | boolean | File[];

export type Field<T = FieldInput> = {
  defaultValue?: T;
  isEqual?: IsEqual;
  name: string;
  parse?: Parse;
  subscriptions?: (keyof FieldSubscription)[];
  validateDefaultValue?: boolean;
  validateFields?: string[];
  validator: FieldValidator<any>;
};
