import React from 'react';
import Enzyme, { mount } from 'enzyme';
import connectToForm, {
  ConnectToFormWrapperProps,
  ConnectToFormProps,
} from '../../src/composers/connectToForm';
import { Context } from '../../src/types';
import { toString, toNumber, toBool } from '../../src/helpers';
import { createFormContext, WrappingFormComponent } from '../utils';

describe('connectToForm()', () => {
  function BaseField() {
    return <div />;
  }

  const Hoc = connectToForm<string>({
    initialValue: '',
    parse: toString,
  })(BaseField);

  const HocChecked = connectToForm<boolean>({
    initialValue: false,
    valueProp: 'checked',
    parse: toBool,
  })(BaseField);

  const HocInitialValue = connectToForm<number>({
    initialValue: 123,
    parse: toNumber,
  })(BaseField);

  const props = {
    name: 'foo',
    defaultValue: 'baz',
    validator() {},
  };

  let form: Context & {
    unregister: () => void;
  };

  beforeEach(() => {
    form = createFormContext();
  });

  function unwrap(
    element: React.ReactElement,
  ): Enzyme.ReactWrapper<ConnectToFormWrapperProps<unknown>> {
    return mount(element, {
      wrappingComponent: WrappingFormComponent,
      wrappingComponentProps: { context: form },
    });
  }

  function findField<P, S>(
    wrapper: Enzyme.ReactWrapper<P, S>,
  ): Enzyme.ReactWrapper<ConnectToFormProps<unknown>> {
    return wrapper.find(BaseField);
  }

  it('returns an HOC', () => {
    expect(Hoc.displayName).toBe('connectToForm(BaseField)');
    // @ts-ignore
    expect(Hoc.WrappedComponent).toBe(BaseField);
  });

  it('sets `defaultValue` from `initialValue` option', () => {
    const wrapper = unwrap(<HocInitialValue name="foo" validator={() => {}} />);

    expect(wrapper.find(BaseField).prop('value')).toBe(123);
  });

  it('sets name and value', () => {
    const wrapper = unwrap(<Hoc {...props} />);

    expect(wrapper.find(BaseField).prop('name')).toBe('foo');
    expect(wrapper.find(BaseField).prop('value')).toBe('baz');
  });

  it('registers field on mount', () => {
    const spy = jest.fn();

    unwrap(<Hoc {...props} unregisterOnUnmount validator={spy} />);

    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'foo',
        defaultValue: 'baz',
        validator: spy,
      }),
      expect.anything(),
    );
  });

  it('re-registers field if name changes', () => {
    const wrapper = unwrap(<Hoc {...props} />);

    wrapper.setProps({
      name: 'bar',
    });

    expect(form.unregister).toHaveBeenCalled();
    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'foo',
        defaultValue: 'baz',
      }),
      expect.anything(),
    );
  });

  it('updates value when defaultValue changes', () => {
    const wrapper = unwrap(<Hoc {...props} />);

    wrapper.setProps({
      defaultValue: 'bar',
    });

    expect(form.change).toHaveBeenCalledWith('foo', 'bar');
  });

  it('unregisters field if `unregisterOnMount` is set', () => {
    const wrapper = unwrap(<Hoc {...props} unregisterOnUnmount />);

    wrapper.unmount();

    expect(form.unregister).toHaveBeenCalled();
  });

  it('doesnt unregister field if `unregisterOnMount` is not set', () => {
    const wrapper = unwrap(<Hoc {...props} />);

    wrapper.unmount();

    expect(form.unregister).not.toHaveBeenCalled();
  });

  it('calls `onBlur`', () => {
    const spy = jest.fn();
    const wrapper = unwrap(<Hoc {...props} onBlur={spy} />);
    const event = { type: 'blur' } as React.FocusEvent;

    findField(wrapper).invoke('onBlur')(event);

    expect(spy).toHaveBeenCalledWith(event);
  });

  it('calls context `change` and `onChange`', () => {
    const spy = jest.fn();
    const wrapper = unwrap(<Hoc {...props} onChange={spy} />);
    const event = { type: 'change' };

    findField(wrapper).invoke('onChange')('new value', event);

    expect(spy).toHaveBeenCalledWith('new value', event, undefined);
    expect(form.change).toHaveBeenCalledWith('foo', 'new value', {});
  });

  it('can pass batch values using `onBatchChange`', () => {
    const wrapper = unwrap(<Hoc {...props} onBatchChange={() => ({ bar: 'other value' })} />);
    const event = { type: 'change' };

    findField(wrapper).invoke('onChange')('new value', event);

    expect(form.change).toHaveBeenCalledWith('foo', 'new value', { bar: 'other value' });
  });

  it('calls `onFocus`', () => {
    const spy = jest.fn();
    const wrapper = unwrap(<Hoc {...props} onFocus={spy} />);
    const event = { type: 'focus' } as React.FocusEvent;

    findField(wrapper).invoke('onFocus')(event);

    expect(spy).toHaveBeenCalledWith(event);
  });

  it('passes form and handler props down', () => {
    const wrapper = unwrap(<Hoc {...props} />);

    expect(wrapper.find(BaseField).props()).toEqual(
      expect.objectContaining({
        errorMessage: '',
        invalid: false,
        name: 'foo',
        value: 'baz',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
      }),
    );
  });

  it('passes custom props down', () => {
    const wrapper = unwrap(<Hoc {...props} aria-hidden="true" />);

    expect(wrapper.find(BaseField).prop('aria-hidden')).toBe('true');
  });

  it('doesnt pass connect props down', () => {
    const wrapper = unwrap(<Hoc {...props} />);

    expect(wrapper.find(BaseField).prop('unregisterOnMount')).toBeUndefined();
    expect(wrapper.find(BaseField).prop('validator')).toBeUndefined();
  });

  it('can change value prop used', () => {
    const wrapper = unwrap(<HocChecked {...props} defaultValue />);

    expect(wrapper.find(BaseField).prop('value')).toBeUndefined();
    expect(wrapper.find(BaseField).prop('checked')).toBe(true);
  });
});
