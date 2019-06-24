import React from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import uuid from 'uuid/v4';
import {
  createForm,
  formSubscriptionItems,
  getIn,
  setIn,
  FORM_ERROR,
  FormState as FinalFormState,
  FormSubscription,
  FormApi,
  FieldState,
  Unsubscribe,
  FieldSubscriber,
  FieldValidator,
} from 'final-form';
import T from '@airbnb/lunar/lib/components/Translate';
import { getErrorMessage } from '@airbnb/lunar/lib/components/ErrorMessage';
import FormErrorMessage from '@airbnb/lunar/lib/components/FormErrorMessage';
import FormContext from '../FormContext';
import { Errors, Parse, Field } from '../../types';
import { throttleToSinglePromise } from '../../helpers';

function mapSubscriptions(subscriptions: string[]): { [sub: string]: boolean } {
  return subscriptions.reduce(
    (result, key) => ({
      ...result,
      [key]: true,
    }),
    {},
  );
}

export type Props<Data extends object> = {
  /** Form fields that will be registered and managed by the current form instance. */
  children: NonNullable<React.ReactNode> | ((state: State<Data>) => NonNullable<React.ReactNode>);
  /** @ignore Initial values for form fields. Optional, as default values are injected when fields are rendered. */
  initialValues?: Data;
  /** Type of HTTP method. */
  method?: 'get' | 'post';
  /** Callback fired when the form has failed to submit. */
  onFailedSubmit?: (data: Data, error: Error) => void;
  /** Callback fired when the form data has failed validation. */
  onFailedValidate?: (data: Data, errors: Errors) => void;
  /** Callback fired when the form state updates, including field updates. */
  onStateUpdate?: (state: State<Data>) => void;
  /**
   * Callback fired when the form has passed validation and data is ready to be submitted.
   * Return a `Promise` to automatically handle form error states.
   */
  onSubmit: (data: Data) => Promise<any>;
  /** Callback fired when the form is reset. */
  onReset?: () => void;
  /**
   * Callback fired after validation. Must return true for passed validation,
   * or false for failed validation.
   */
  onValidate?: (data: Data, errors: Errors, fields: FieldState<any>[]) => boolean;
  /** A list of `final-form` subscriptions to listen to. */
  subscriptions?: (keyof FormSubscription)[];
};

export type State<Data extends object> = FinalFormState<Data> & {
  id: string;
};

/**
 * A form manager built on [final-form](https://github.com/final-form/final-form).
 */
export default class Form<Data extends object = any> extends React.Component<
  Props<Data>,
  State<Data>
> {
  static propTypes = {
    initialValues: PropTypes.object,
    subscriptions: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    initialValues: {},
    method: 'post',
    onFailedSubmit() {},
    onFailedValidate() {},
    onReset() {},
    onStateUpdate() {},
    onValidate: () => true,
    subscriptions: formSubscriptionItems,
  };

  form: FormApi<Data>;

  registeredFields: { [name: string]: Unsubscribe } = {};

  constructor(props: Props<Data>) {
    super(props);

    const { initialValues, subscriptions } = props;

    // Setup our form instance
    this.form = createForm<Data>({
      destroyOnUnregister: true,
      initialValues,
      mutators: {
        setFieldConfig: this.setFieldConfig,
      },
      onSubmit: this.handleSubmit,
      validate: this.handleValidate,
    });

    this.form.subscribe(this.handleStateUpdate, mapSubscriptions(subscriptions as string[]));

    // Wait until mounted
    this.form.pauseValidation();
  }

  componentDidMount() {
    this.form.resumeValidation();
  }

  componentDidUpdate({ initialValues }: Props<Data>) {
    if (!shallowEqual(initialValues, this.props.initialValues!)) {
      this.form.initialize(this.props.initialValues!);
    }
  }

  /**
   * Cast a value using the fields `parse` function.
   */
  castValue(value: any, parse: Parse): any {
    return Array.isArray(value) ? value.map(v => parse(v)) : parse(value);
  }

  /**
   * Change the value of the source input, while also changing batch values using an object.
   */
  changeValue = (name: string, value: any, batchValues?: Partial<Data>) => {
    const values = {
      ...batchValues,
      [name]: value,
    };

    this.form.batch(() => {
      Object.entries(values).forEach(([fieldName, fieldValue]) => {
        const field = this.form.getFieldState(fieldName);

        if (field) {
          this.form.change(fieldName, fieldValue);
        }
      });
    });
  };

  /**
   * Return a list of all field states.
   */
  getFields = (): FieldState<any>[] => {
    if (!this.form) {
      return [];
    }

    // @ts-ignore Not undefined
    return this.form
      .getRegisteredFields()
      .map(name => this.form.getFieldState(name))
      .filter(field => typeof field !== 'undefined');
  };

  /**
   * Return form state.
   */
  getState = () => this.form.getState();

  /**
   * Handle form submission once data has been validated.
   * https://github.com/final-form/final-form#onsubmit-values-object-form-formapi-callback-errors-object--void--object--promiseobject--void
   */
  private handleSubmit = (
    data: Data,
    form: FormApi<Data>,
    setErrors?: (errors?: Errors) => void,
  ) => {
    const preparedData = this.prepareData(data);
    let promise;

    try {
      promise = this.props.onSubmit(preparedData);
    } catch (error) {
      promise = Promise.reject(error);
    }

    if (!(promise instanceof Promise)) {
      promise = Promise.resolve(promise);
    }

    return promise.catch(error => {
      if (setErrors) {
        setErrors({
          [FORM_ERROR]: T.phrase(
            'Failed to submit form. %{error}',
            {
              error: getErrorMessage(error),
            },
            'A generic error when a form failed to submit',
          ),
        });
      }

      this.props.onFailedSubmit!(preparedData, error);

      throw error;
    });
  };

  /**
   * Handle resetting the form natively.
   */
  private handleFormReset = () => {
    this.form.reset();
    this.props.onReset!();
  };

  /**
   * Handle submitting the form natively.
   */
  private handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.form.submit();
  };

  /**
   * Handle form state changes.
   */
  private handleStateUpdate = (state: FinalFormState<Data>) => {
    // This method is immediately called within the constructor,
    // so we need to set the state manually for the first time before mount,
    // and on subsequent updates use `setState`.
    if (this.state) {
      this.setState(
        prevState => ({
          ...prevState,
          ...state,
        }),
        () => {
          this.props.onStateUpdate!(this.state!);
        },
      );
    } else {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state = {
        ...state,
        id: uuid(),
      };
    }
  };

  /**
   * Handle validating the entire form when a field's value changes.
   * https://github.com/final-form/final-form#validate-values-object--object--promiseobject
   */
  private handleValidate = throttleToSinglePromise(async (data: object) => {
    const nextData = data as Data;
    const errors = await this.validate(nextData);
    const passes = await this.props.onValidate!(nextData, errors, this.getFields());
    let errorCount = Object.keys(errors).length;

    if (!passes && errorCount === 0) {
      errors[FORM_ERROR] = T.phrase(
        'Failed to validate form. Please try again.',
        {},
        'A generic error when a form failed validation in any way',
      );
      errorCount += 1;
    }

    if (errorCount > 0) {
      this.props.onFailedValidate!(nextData, errors);
    }

    return errors;
  });

  /**
   * Trim and type cast the dataset.
   */
  prepareData(initialData: Partial<Data>): Data {
    return this.getFields().reduce((data, { name, data: fieldData }) => {
      let value = getIn(data, name);

      if (!fieldData || !fieldData.config) {
        return data;
      }

      // Type cast the value
      if (fieldData.config.parse) {
        value = this.castValue(value, fieldData.config.parse);
      }

      // Trim the value
      if (typeof value === 'string') {
        value = value.trim();
      }

      return setIn(data, name, value);
    }, initialData) as Data;
  }

  /**
   * Register a new field and set their default value into the data set.
   * Optionally validate the default value if `validateDefaultValue` is true.
   */
  registerField = <T extends unknown>(field: Field, onUpdate: FieldSubscriber<T>) => {
    const { name, isEqual, subscriptions = [], validateFields = [] } = field;
    const unregister = this.form.registerField(name, onUpdate, mapSubscriptions(subscriptions), {
      isEqual,
      getValidator: () => this.wrapValidator(field.validator),
      validateFields,
    });

    // Only trigger this functionality on the first register.
    // Subsequent registers with the same name would clobber our internal state.
    // This typical happens when a component is mounted and unmounted repeatedly.
    if (!this.registeredFields[name]) {
      this.form.mutators.setFieldConfig(name, field);
    }

    this.registeredFields[name] = () => {
      delete this.registeredFields[name];
      unregister();
    };

    return this.registeredFields[name];
  };

  /**
   * Form mutator to manually set a fields configuration and value.
   */
  setFieldConfig([name, config]: [string, Field], { fields, formState }: any) {
    const field = fields[name];
    const initial = getIn(formState.initialValues, name);
    const value = typeof initial === 'undefined' ? config.defaultValue : initial;

    if (!field) {
      return;
    }

    field.data.config = config;
    field.initial = value;
    field.value = value;
    field.touched = config.validateDefaultValue;

    /* eslint-disable no-param-reassign */
    formState.initialValues = setIn(formState.initialValues, name, value);
    formState.values = setIn(formState.values, name, value);
    /* eslint-enable no-param-reassign */
  }

  /**
   * Manually submit the form.
   */
  submitForm = () => Promise.resolve(this.form.submit());

  /**
   * Validate data and return an object of errors.
   */
  async validate(data: Data): Promise<Errors> {
    const fields = this.getFields();
    let errors = {};

    await Promise.all(
      fields.map(async field => {
        if (!field) return;

        const { name, data: fieldData } = field;

        if (fieldData && fieldData.config && fieldData.config.validator) {
          const value = getIn(data, name);

          if (typeof value !== 'undefined') {
            try {
              await fieldData.config.validator(value, data);
            } catch (error) {
              errors = setIn(errors, name, error.message);
            }
          }
        }
      }),
    );

    return errors;
  }

  /**
   * Wrap a validator in a closure to correctly handle error states.
   */
  wrapValidator(validator?: FieldValidator<any>): FieldValidator<any> {
    return async (value, data) => {
      if (validator) {
        try {
          await validator(value, data);
        } catch (error) {
          return error.message;
        }
      }

      return undefined;
    };
  }

  render() {
    const { children, method } = this.props;
    const { id, submitError } = this.state!;
    // @ts-ignore Bug: https://github.com/Microsoft/TypeScript/issues/26970
    const content = typeof children === 'function' ? children(this.state!) : children;

    return (
      <FormContext.Provider
        value={{
          change: this.changeValue,
          getFields: this.getFields,
          getState: this.getState,
          register: this.registerField,
          submit: this.submitForm,
        }}
      >
        <form
          id={id}
          method={method}
          encType="multipart/form-data"
          onSubmit={this.handleFormSubmit}
          onReset={this.handleFormReset}
        >
          {content}

          {submitError && <FormErrorMessage id={id} error={submitError} />}
        </form>
      </FormContext.Provider>
    );
  }
}
