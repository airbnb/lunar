import {
  IsEqual,
  FormState,
  FieldState,
  FieldSubscriber,
  FieldSubscription,
  FieldValidator,
  Unsubscribe,
} from 'final-form';

export type Context = {
  change: (name: string, value: string, batchValues?: object) => void;
  getFields: () => FieldState[];
  getState: () => FormState;
  register: (field: Field, onUpdate: FieldSubscriber) => Unsubscribe;
  submit: () => Promise<object | undefined>;
};

export type Errors = {
  [key: string]: string;
};

export type State = FormState;

export type Parse = (value: unknown) => unknown;

export type Field = {
  defaultValue?: boolean | string | number | string[] | number[];
  isEqual?: IsEqual;
  name: string;
  parse?: Parse;
  subscriptions?: (keyof FieldSubscription)[];
  validateDefaultValue?: boolean;
  validateFields?: string[];
  validator: FieldValidator;
};
