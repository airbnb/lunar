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
// File[] - FileInput

export type Context = {
  change: (name: string, value: any, batchValues?: object) => void;
  getFields: () => FieldState<any>[];
  getState: () => FormState<any>;
  register: (field: Field<any>, onUpdate: FieldSubscriber<any>) => Unsubscribe;
  submit: () => Promise<object | undefined>;
};

export type Errors = {
  [key: string]: string;
};

export type DefaultValue<T> = T | null | undefined;

export type UnboxValue<T> = T extends (infer U)[] ? U : T;

export type Parse<T> = (value: UnboxValue<T> | null | undefined) => UnboxValue<T>;

export type Field<T> = {
  defaultValue?: DefaultValue<T>;
  isEqual?: IsEqual;
  name: string;
  parse?: Parse<T>;
  subscriptions?: (keyof FieldSubscription)[];
  validateDefaultValue?: boolean;
  validateFields?: string[];
  validator: FieldValidator<T>;
};
