import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import connectToForm, { PROP_NAMES } from '../../src/composers/connectToForm';
import { Context } from '../../src/types';

describe('connectToForm()', () => {
  function Foo() {
    return <div />;
  }

  const Hoc = connectToForm()(Foo);
  const HocMultiple = connectToForm({ multiple: true })(Foo);
  const HocChecked = connectToForm({ valueProp: 'checked', parse: Boolean })(Foo);
  const HocInitialValue = connectToForm({ initialValue: 123 })(Foo);

  const props = {
    name: 'foo',
    defaultValue: 'baz',
    validator() {},
  };

  let form: Context;

  beforeEach(() => {
    form = {
      change: jest.fn(),
      getFields: jest.fn(),
      getState: jest.fn(),
      register: jest.fn(() => jest.fn()),
      submit: jest.fn(),
    };
  });

  function unwrap(element: any): Enzyme.ShallowWrapper {
    return unwrapHOCs(shallow(element), 'Foo', form);
  }

  it('returns an HOC', () => {
    expect(Hoc.displayName).toBe('connectToForm(Foo)');
    expect((Hoc as any).WrappedComponent).toBe(Foo);
  });

  it('sets `defaultValue` from `initialValue` option', () => {
    const wrapper = unwrap(<HocInitialValue name="foo" validator={() => {}} />);

    expect(wrapper.prop('value')).toBe('123');
  });

  it('doesnt pass field props to wrapped component', () => {
    const wrapper = unwrap(<Hoc {...props} />);

    PROP_NAMES.forEach(name => {
      if (name !== 'name' && name.slice(0, 2) !== 'on') {
        expect(wrapper.prop(name)).toBeUndefined();
      }
    });
  });

  describe('componentDidMount()', () => {
    it('sets name and default value into state', () => {
      const wrapper = unwrap(<Hoc {...props} />);

      expect(wrapper.state()).toEqual(
        expect.objectContaining({
          error: '',
          invalid: false,
          name: 'foo',
          value: 'baz',
        }),
      );
    });

    it('registers field on mount', () => {
      const spy = jest.fn();
      const wrapper = unwrap(<Hoc {...props} unregisterOnUnmount validator={spy} />);

      expect(form.register).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'foo',
          defaultValue: 'baz',
          unregisterOnUnmount: true,
          validator: spy,
        }),
        expect.anything(),
      );

      expect(typeof (wrapper.instance() as any).unregister).toBe('function');
    });

    it('sets boolean flag on mount', () => {
      const wrapper = unwrap(<Hoc {...props} unregisterOnUnmount />);

      expect((wrapper.instance() as any).mounted).toBe(true);
    });
  });

  describe('componentDidUpdate()', () => {
    it('re-registers field if name changes', () => {
      const wrapper = unwrap(<Hoc {...props} />);
      const spy = (wrapper.instance() as any).unregister;

      wrapper.setProps({
        name: 'bar',
      });

      expect(spy).toHaveBeenCalled();
      expect(form.register).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'foo',
          defaultValue: 'baz',
        }),
        expect.anything(),
      );
    });

    it('updates state.value when defaultValue changes', () => {
      const wrapper = unwrap(<Hoc {...props} />);

      wrapper.setProps({
        defaultValue: 'bar',
      });

      expect(wrapper.state()).toEqual(
        expect.objectContaining({
          value: 'bar',
        }),
      );

      expect(form.change).toHaveBeenCalledWith('foo', 'bar', {});
    });
  });

  describe('componentWillUnmount()', () => {
    it('unregisters field if `unregisterOnMount` is set', () => {
      const wrapper = unwrap(<Hoc {...props} unregisterOnUnmount />);
      const spy = (wrapper.instance() as any).unregister;

      wrapper.instance().componentWillUnmount!();

      expect(spy).toHaveBeenCalled();
    });

    it('doesnt unregister field if `unregisterOnMount` is not set', () => {
      const wrapper = unwrap(<Hoc {...props} />);
      const spy = (wrapper.instance() as any).unregister;

      wrapper.instance().componentWillUnmount!();

      expect(spy).not.toHaveBeenCalled();
    });

    it('sets mounted boolean to false', () => {
      const wrapper = unwrap(<Hoc {...props} />);

      wrapper.instance().componentWillUnmount!();

      expect((wrapper.instance() as any).mounted).toBe(false);
    });
  });

  describe('formatError()', () => {
    let formatError: any;

    beforeEach(() => {
      const wrapper = unwrap(<Hoc {...props} />);

      ({ formatError } = wrapper.instance() as any);
    });

    it('returns an empty string for falsy', () => {
      expect(formatError()).toBe('');
      expect(formatError(null)).toBe('');
      expect(formatError(false)).toBe('');
    });

    it('casts truthy value to string', () => {
      expect(formatError('hi')).toBe('hi');
      expect(formatError(123)).toBe('123');
    });

    it('supports `Error` objects', () => {
      expect(formatError(new Error('hi'))).toBe('hi');
    });
  });

  describe('formatValue()', () => {
    it('casts value using `parse` prop', () => {
      const wrapper = unwrap(<Hoc {...props} parse={Number} />);
      const formatValue = (wrapper.instance() as any).formatValue.bind(wrapper.instance());

      expect(formatValue(1)).toBe(1);
      expect(formatValue('1')).toBe(1);
      expect(formatValue([1, '2', '3.5'])).toEqual([1, 2, 3.5]);
    });

    it('converts to an array if requires multiple', () => {
      const wrapper = unwrap(<HocMultiple {...props} parse={Number} />);
      const formatValue = (wrapper.instance() as any).formatValue.bind(wrapper.instance());

      expect(formatValue(1)).toEqual([1]);
      expect(formatValue('1')).toEqual([1]);
      expect(formatValue([1, '2', '3.5'])).toEqual([1, 2, 3.5]);
    });
  });

  describe('handleBlur()', () => {
    it('calls state and props blur', () => {
      const spy = jest.fn();
      const spyProp = jest.fn();
      const wrapper = unwrap(<Hoc {...props} onBlur={spyProp} />);
      const event = { type: 'blur' };

      wrapper.setState({
        blur: spy,
      });

      wrapper.simulate('blur', event);

      expect(spy).toHaveBeenCalled();
      expect(spyProp).toHaveBeenCalledWith(event);
    });
  });

  describe('handleChange()', () => {
    it('calls context and props change', () => {
      const spy = jest.fn();
      const wrapper = unwrap(<Hoc {...props} onChange={spy} />);
      const event = { type: 'change' };

      wrapper.simulate('change', 'new value', event);

      expect(spy).toHaveBeenCalledWith('new value', event, undefined);
      expect(form.change).toHaveBeenCalledWith('foo', 'new value', {});
    });

    it('can pass batch values using `onBatchChange`', () => {
      const wrapper = unwrap(<Hoc {...props} onBatchChange={() => ({ bar: 'other value' })} />);

      wrapper.simulate('change', 'new value');

      expect(form.change).toHaveBeenCalledWith('foo', 'new value', { bar: 'other value' });
    });
  });

  describe('handleFocus()', () => {
    it('calls state and props focus', () => {
      const spy = jest.fn();
      const spyProp = jest.fn();
      const wrapper = unwrap(<Hoc {...props} onFocus={spyProp} />);
      const event = { type: 'focus' };

      wrapper.setState({
        focus: spy,
      });

      wrapper.simulate('focus', event);

      expect(spy).toHaveBeenCalled();
      expect(spyProp).toHaveBeenCalledWith(event);
    });
  });

  describe('handleUpdate()', () => {
    it('merges with previous state', () => {
      const wrapper = unwrap(<Hoc {...props} />);

      expect(wrapper.state()).toEqual(
        expect.objectContaining({
          error: '',
          invalid: false,
          name: 'foo',
          value: 'baz',
        }),
      );

      // @ts-ignore Allow private access
      wrapper.instance().handleUpdate({
        name: 'foofoo',
        value: 'barbar',
      });

      expect(wrapper.state()).toEqual(
        expect.objectContaining({
          error: '',
          invalid: false,
          name: 'foofoo',
          value: 'barbar',
        }),
      );
    });

    it('calls `onStateUpdate` with changed state', () => {
      const spy = jest.fn();
      const wrapper = unwrap(<Hoc {...props} onStateUpdate={spy} />);

      // @ts-ignore Allow private access
      wrapper.instance().handleUpdate({
        name: 'foofoo',
        value: 'barbar',
      });

      expect(spy).toHaveBeenCalledWith({
        name: 'foofoo',
        value: 'barbar',
      });
    });

    it('does nothing if component is not mounted', () => {
      const spy = jest.fn();
      const wrapper = unwrap(<Hoc {...props} onStateUpdate={spy} />);

      (wrapper.instance() as any).mounted = false;

      // @ts-ignore Allow private access
      wrapper.instance().handleUpdate({
        name: 'foofoo',
        value: 'barbar',
      });

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('render()', () => {
    it('passes form and handler props down', () => {
      const wrapper = unwrap(<Hoc {...props} />);
      const instance: any = wrapper.instance();

      expect(wrapper.props()).toEqual(
        expect.objectContaining({
          errorMessage: '',
          invalid: false,
          name: 'foo',
          value: 'baz',
          onBlur: instance.handleBlur,
          onChange: instance.handleChange,
          onFocus: instance.handleFocus,
        }),
      );
    });

    it('passes custom props down', () => {
      const wrapper = unwrap(<Hoc {...props} aria-hidden="true" />);

      expect(wrapper.prop('aria-hidden')).toBe('true');
    });

    it('doesnt pass connect props down', () => {
      const wrapper = unwrap(<Hoc {...props} />);

      expect(wrapper.prop('unregisterOnMount')).toBeUndefined();
      expect(wrapper.prop('validator')).toBeUndefined();
    });

    it('can change value prop used', () => {
      const wrapper = unwrap(<HocChecked {...props} />);

      expect(wrapper.prop('value')).toBeUndefined();
      expect(wrapper.prop('checked')).toBe(true);
    });
  });
});
