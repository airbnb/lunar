import {
  IsEqual,
  FormState,
  FieldSubscriber,
  FieldSubscription,
  FieldValidator,
  Unsubscribe,
} from 'final-form';

export type Context = {
  change: (name: string, value: string, batchValues?: object) => void;
  getState: () => FormState;
  register: (field: Field, onUpdate: FieldSubscriber) => Unsubscribe;
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
