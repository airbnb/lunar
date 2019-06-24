import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { FORM_ERROR } from 'final-form';
import FormErrorMessage from '@airbnb/lunar/lib/components/FormErrorMessage';
import Form, { Props, State } from '../../src/components/Form';

describe('<Form />', () => {
  let wrapper: Enzyme.ShallowWrapper<Props<any>, State, Form>;
  let instance: Form;

  beforeEach(() => {
    wrapper = shallow(<Form onSubmit={data => Promise.resolve(data)}>Hello</Form>);
    instance = wrapper.instance();
  });

  it('creates a final-form instance', () => {
    expect(instance.form).toBeDefined();
  });

  it('can customize `initialValues`', () => {
    wrapper = shallow(
      <Form onSubmit={() => Promise.resolve()} initialValues={{ foo: 'bar' }}>
        Hello
      </Form>,
    );

    expect(wrapper.state('initialValues')).toEqual({ foo: 'bar' });
    expect((wrapper.state('values') as any).foo).toBe('bar');
  });

  it('can change `initialValues` through props', () => {
    const spy = jest.fn();

    wrapper = shallow(
      <Form onSubmit={() => Promise.resolve()} initialValues={{ foo: 'bar' }}>
        Hello
      </Form>,
    );

    (wrapper.instance() as Form).form.initialize = spy;

    wrapper.setProps({
      initialValues: { foo: 'qux' },
    });

    expect(spy).toHaveBeenCalledWith({ foo: 'qux' });
  });

  it('renders children', () => {
    expect(wrapper.find('form').prop('children')).toEqual(['Hello', undefined]);
  });

  it('renders function children', () => {
    const spy = jest.fn();

    wrapper = shallow(
      <Form onSubmit={() => Promise.resolve()} initialValues={{ foo: 'bar' }}>
        {spy}
      </Form>,
    );

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ initialValues: { foo: 'bar' } }));
  });

  it('shows submit error', () => {
    expect(wrapper.find(FormErrorMessage)).toHaveLength(0);

    wrapper.setState({
      submitError: 'Failed submit.',
    });

    expect(wrapper.find(FormErrorMessage)).toHaveLength(1);
    expect(wrapper.find(FormErrorMessage).prop('error')).toBe('Failed submit.');
  });

  describe('castValue()', () => {
    it('casts to type', () => {
      expect(instance.castValue(123, String)).toBe('123');
    });

    it('supports arrays', () => {
      expect(instance.castValue([1, 2, 3], String)).toEqual(['1', '2', '3']);
    });
  });

  describe('changeValue()', () => {
    let spy: jest.SpyInstance;

    beforeEach(() => {
      spy = jest.spyOn(instance.form, 'change');

      instance.registerField(
        {
          name: 'foo',
          defaultValue: 'foo',
          validator() {},
        },
        () => {},
      );

      instance.registerField(
        {
          name: 'bar',
          defaultValue: 'bar',
          validator() {},
        },
        () => {},
      );

      instance.registerField(
        {
          name: 'baz',
          defaultValue: 'baz',
          validator() {},
        },
        () => {},
      );
    });

    it('changes a single value', () => {
      instance.changeValue('foo', 123);

      expect(spy).toHaveBeenCalledWith('foo', 123);
    });

    it('batches multiple values', () => {
      instance.changeValue('foo', 123, {
        bar: 456,
        baz: 789,
      });

      expect(spy).toHaveBeenCalledWith('bar', 456);
      expect(spy).toHaveBeenCalledWith('baz', 789);
      expect(spy).toHaveBeenCalledWith('foo', 123);
    });

    it('batch value cannot overwrite primary value', () => {
      instance.changeValue('foo', 123, {
        foo: 456,
      });

      expect(spy).toHaveBeenCalledWith('foo', 123);
    });

    it('skips unknown fields', () => {
      instance.changeValue('wtf', 123, {
        qux: 456,
      });

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('handleSubmit()', () => {
    it('returns promise from `onSubmit`', () => {
      // @ts-ignore Allow private access
      const promise = instance.handleSubmit({}, {}, () => {});

      expect(promise).toBeInstanceOf(Promise);
    });

    it('converts to a promise if `onSubmit` does not return one', () => {
      wrapper.setProps({
        // @ts-ignore Test non-promise
        onSubmit: () => 123,
      });

      // @ts-ignore Allow private access
      const promise = instance.handleSubmit({}, {}, () => {});

      expect(promise).toBeInstanceOf(Promise);
    });

    it('converts to a promise if `onSubmit` does not return one, and handles any error', () => {
      const spy = jest.fn();

      wrapper.setProps({
        onSubmit: () => {
          throw new Error('Oops');
        },
      });

      const promise = instance
        // @ts-ignore Allow private access
        .handleSubmit({}, {}, spy)
        .then(() => {
          expect(spy).toHaveBeenCalled();
        })
        .catch(() => {});

      expect(promise).toBeInstanceOf(Promise);
    });

    it('passes data through', async () => {
      // @ts-ignore Allow private access
      const data = await instance.handleSubmit({ foo: 'bar' }, {}, () => {});

      expect(data).toEqual({ foo: 'bar' });
    });

    it('sets error if catch occurs', async () => {
      const spy = jest.fn();
      const error = new Error('Oops');

      wrapper.setProps({
        onSubmit: () => Promise.reject(error),
      });

      try {
        // @ts-ignore Allow private access
        await instance.handleSubmit({}, {}, spy);
      } catch (error2) {
        expect(error2).toBe(error);
      }

      expect(spy).toHaveBeenCalled();
    });

    it('calls `onFailedSubmit` if catch occurs', async () => {
      const spy = jest.fn();
      const error = new Error('Oops');

      wrapper.setProps({
        onSubmit: () => Promise.reject(error),
        onFailedSubmit: spy,
      });

      try {
        // @ts-ignore Allow private access
        await instance.handleSubmit({ foo: 'bar' }, {}, () => {});
      } catch (error2) {
        expect(error2).toBe(error);
      }

      expect(spy).toHaveBeenCalledWith({ foo: 'bar' }, error);
    });
  });

  describe('handleFormReset()', () => {
    it('calls reset on form', () => {
      const spy = jest.spyOn(instance.form, 'reset');

      wrapper.find('form').simulate('reset');

      expect(spy).toHaveBeenCalled();
    });

    it('calls onReset prop', () => {
      const spy = jest.fn();

      wrapper.setProps({
        onReset: spy,
      });

      wrapper.find('form').simulate('reset');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('handleFormSubmit()', () => {
    it('calls submit on form', () => {
      const spy = jest.spyOn(instance.form, 'submit');

      wrapper.find('form').simulate('submit', { preventDefault() {} });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('handleValidate()', () => {
    beforeEach(() => {
      instance.registerField(
        {
          name: 'foo',
          defaultValue: 'foo',
          parse: String,
          validator() {},
        },
        () => {},
      );

      instance.registerField(
        {
          name: 'bar',
          defaultValue: 'bar',
          parse: Number,
          validator: () => {
            throw new Error('Failure');
          },
        },
        () => {},
      );

      instance.registerField(
        {
          name: 'baz',
          defaultValue: 'baz',
          parse: Boolean,
          validator() {},
        },
        () => {},
      );
    });

    it('calls `onValidate`', async () => {
      const spy = jest.fn(() => true);

      wrapper.setProps({
        onValidate: spy,
      });

      // @ts-ignore Allow private access
      await instance.handleValidate({ foo: 'foo' });

      expect(spy).toHaveBeenCalledWith({ foo: 'foo' }, {}, instance.getFields());
    });

    it('can fail using `onValidate`', async () => {
      wrapper.setProps({
        onValidate: () => false,
      });

      // @ts-ignore Allow private access
      expect(await instance.handleValidate({ foo: 'foo' })).toEqual({
        [FORM_ERROR]: 'Failed to validate form. Please try again.',
      });
    });

    it('calls `onFailedValidate` if `onValidate` fails', async () => {
      const spy = jest.fn();

      wrapper.setProps({
        onValidate: () => false,
        onFailedValidate: spy,
      });

      // @ts-ignore Allow private access
      await instance.handleValidate({ foo: 'foo' });

      expect(spy).toHaveBeenCalledWith(
        { foo: 'foo' },
        {
          [FORM_ERROR]: 'Failed to validate form. Please try again.',
        },
      );
    });

    it('runs validators', async () => {
      // @ts-ignore Allow private access
      expect(await instance.handleValidate({ bar: 123 })).toEqual({
        bar: 'Failure',
      });
    });

    it('calls `onFailedValidate` if validators fails', async () => {
      const spy = jest.fn();

      wrapper.setProps({
        onFailedValidate: spy,
      });
      // @ts-ignore Allow private access
      await instance.handleValidate({ bar: 123 });

      expect(spy).toHaveBeenCalledWith(
        { bar: 123 },
        {
          bar: 'Failure',
        },
      );
    });
  });

  describe('prepareData()', () => {
    beforeEach(() => {
      instance.registerField(
        {
          name: 'foo',
          defaultValue: 'foo',
          parse: String,
          validator() {},
        },
        () => {},
      );

      instance.registerField(
        {
          name: 'bar',
          defaultValue: 'bar',
          parse: Number,
          validator() {},
        },
        () => {},
      );

      instance.registerField(
        {
          name: 'baz',
          defaultValue: 'baz',
          parse: Boolean,
          validator() {},
        },
        () => {},
      );
    });

    it('trims strings', () => {
      expect(instance.prepareData({ foo: ' foo ' })).toEqual(
        expect.objectContaining({ foo: 'foo' }),
      );
    });

    it('parses strings', () => {
      expect(instance.prepareData({ foo: 123 })).toEqual(expect.objectContaining({ foo: '123' }));
    });

    it('parses numbers', () => {
      expect(instance.prepareData({ bar: '123' })).toEqual(expect.objectContaining({ bar: 123 }));
    });

    it('parses booleans', () => {
      expect(instance.prepareData({ baz: 0 })).toEqual(expect.objectContaining({ baz: false }));
    });

    it('parses all', () => {
      expect(instance.prepareData({ foo: ' foo ', bar: '123.45', baz: 1 })).toEqual({
        foo: 'foo',
        bar: 123.45,
        baz: true,
      });
    });

    it('passes through unknown fields', () => {
      expect(instance.prepareData({ foo: ' foo ', bar: '123.45', baz: 1, qux: [1, 2, 3] })).toEqual(
        { foo: 'foo', bar: 123.45, baz: true, qux: [1, 2, 3] },
      );
    });
  });

  describe('registerField()', () => {
    it('registers a field in the form', () => {
      const spy = jest.fn();
      const func = () => {};

      instance.form.registerField = spy;
      instance.registerField(
        {
          name: 'foo',
          isEqual: () => true,
          validateFields: ['foo'],
          subscriptions: ['dirty'],
          validator() {},
        },
        func,
      );

      expect(spy).toHaveBeenCalledWith(
        'foo',
        func,
        { dirty: true },
        expect.objectContaining({
          validateFields: ['foo'],
        }),
      );
    });

    it('registers a field in the component', () => {
      const spy = jest.fn();
      const func = () => {};

      instance.form.registerField = spy;
      instance.registerField(
        {
          name: 'foo',
          isEqual: () => true,
          validateFields: ['foo'],
          subscriptions: ['dirty'],
          validator() {},
        },
        func,
      );

      expect(instance.registeredFields.foo).toBeDefined();
    });

    it('unregisters a field', () => {
      const spy = jest.fn();
      const func = () => {};

      instance.form.registerField = () => spy;

      const unregister = instance.registerField(
        {
          name: 'foo',
          isEqual: () => true,
          validateFields: ['foo'],
          subscriptions: ['dirty'],
          validator() {},
        },
        func,
      );

      expect(instance.registeredFields.foo).toBeDefined();

      unregister();

      expect(spy).toHaveBeenCalled();
      expect(instance.registeredFields.foo).toBeUndefined();
    });

    it('calls a mutator for config', () => {
      const spy = jest.fn();

      instance.form.mutators.setFieldConfig = spy;
      instance.registerField({ name: 'foo', validator() {} }, () => {});

      expect(spy).toHaveBeenCalledWith('foo', expect.objectContaining({ name: 'foo' }));
    });

    it('it only calls mutator once for consecutive registers', () => {
      const spy = jest.spyOn(instance.form.mutators, 'setFieldConfig');

      instance.registerField({ name: 'foo', validator() {} }, () => {});
      instance.registerField({ name: 'foo', validator() {} }, () => {});
      instance.registerField({ name: 'foo', validator() {} }, () => {});

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('setFieldConfig()', () => {
    it('sets all the correct values', () => {
      const config = { name: 'foo', defaultValue: 123, validateDefaultValue: true, validator() {} };
      const fields = { foo: { data: {} } };
      const formState = { initialValues: {}, values: {} };

      instance.setFieldConfig(['foo', config], { fields, formState });

      expect(fields).toEqual({
        foo: {
          data: { config },
          initial: 123,
          value: 123,
          touched: true,
        },
      });

      expect(formState).toEqual({
        initialValues: {
          foo: 123,
        },
        values: {
          foo: 123,
        },
      });
    });
  });

  describe('submitForm()', () => {
    it('calls `submit` on the final-form instance', () => {
      const spy = jest.spyOn(instance.form, 'submit');

      instance.submitForm();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('validate()', () => {
    it('returns empty object for unknown fields', async () => {
      expect(await instance.validate({ foo: 123 })).toEqual({});
    });

    it('adds error to object if failed', async () => {
      instance.registerField(
        {
          name: 'foo',
          defaultValue: 'foo',
          validator: () => {
            throw new Error('Failed');
          },
        },
        () => {},
      );

      expect(await instance.validate({ foo: 123 })).toEqual({ foo: 'Failed' });
    });

    it('doesnt add error to object if passes', async () => {
      instance.registerField(
        {
          name: 'foo',
          defaultValue: 'foo',
          validator: () => {},
        },
        () => {},
      );

      expect(await instance.validate({ foo: 123 })).toEqual({});
    });

    it('doesnt add error to object if no validator', async () => {
      instance.registerField(
        {
          name: 'foo',
          defaultValue: 'foo',
          validator() {},
        },
        () => {},
      );

      expect(await instance.validate({ foo: 123 })).toEqual({});
    });

    it('doesnt add error to object if field not in data', async () => {
      instance.registerField(
        {
          name: 'foo',
          defaultValue: 'foo',
          validator: () => {
            throw new Error('Failed');
          },
        },
        () => {},
      );

      expect(await instance.validate({ bar: 123 })).toEqual({});
    });

    it('supports nested names', async () => {
      instance.registerField(
        {
          name: 'foo[bar][baz]',
          defaultValue: 'foo',
          validator: () => {
            throw new Error('Failed');
          },
        },
        () => {},
      );

      expect(await instance.validate({ foo: { bar: { baz: 123 } } })).toEqual({
        foo: { bar: { baz: 'Failed' } },
      });
    });

    it('waits for async validators', async () => {
      const spy = jest.fn();

      instance.registerField(
        {
          name: 'foo',
          defaultValue: 'foo',
          validator: () => Promise.resolve(),
        },
        () => {},
      );

      const promise = instance
        .validate({ foo: 123 })
        .then(spy)
        .then(() => {
          expect(spy).toHaveBeenCalledWith({});
        });

      expect(spy).not.toHaveBeenCalled();

      return promise;
    });

    it('supports async rejections', async () => {
      const spy = jest.fn();
      const FAILED = 'FAILED';

      instance.registerField(
        {
          name: 'foo',
          defaultValue: 'foo',
          validator: () => Promise.reject(new Error(FAILED)),
        },
        () => {},
      );

      const promise = instance
        .validate({ foo: 123 })
        .then(spy)
        .then(() => {
          expect(spy).toHaveBeenCalledWith({ foo: FAILED });
        });

      expect(spy).not.toHaveBeenCalled();

      return promise;
    });
  });

  describe('wrapValidator()', () => {
    it('wraps with a closure', async () => {
      const func = instance.wrapValidator((value, data) => {
        expect(value).toBeDefined();
        expect(data).toBeDefined();

        if (!value) {
          throw new Error('Failure');
        }
      });

      expect(typeof func).toBe('function');

      // Returns undefined by default
      expect(await func(123, {})).toBeUndefined();

      // Throws an error if failed
      expect(await func('', {})).toBe('Failure');
    });
  });
});
