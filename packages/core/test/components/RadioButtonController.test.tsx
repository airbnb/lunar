import React from 'react';
import { shallow } from 'enzyme';
import RadioButtonController from '../../src/components/RadioButtonController';

describe('<RadioButtonController />', () => {
  const props = {
    id: 'foo',
    name: 'rb',
    value: 'foo',
    label: 'Label',
    onChange() {},
  };

  const event = {
    target: {},
  } as React.ChangeEvent<unknown>;

  it('sets default value', () => {
    const wrapper = shallow(
      <RadioButtonController {...props}>{() => <div />}</RadioButtonController>,
    );

    expect(wrapper.state('value')).toBe('foo');
  });

  it('updates state value when props change', () => {
    const wrapper = shallow(
      <RadioButtonController {...props}>{() => <div />}</RadioButtonController>,
    );

    wrapper.setProps({
      value: 'bar',
    });

    expect(wrapper.state('value')).toBe('bar');
  });

  it('does nothing when value is the same', () => {
    const wrapper = shallow(
      <RadioButtonController {...props}>{() => <div />}</RadioButtonController>,
    );

    wrapper.setProps({
      value: 'foo',
    });

    expect(wrapper.state('value')).toBe('foo');
  });

  it('passes correct args to function child', () => {
    shallow(
      <RadioButtonController {...props}>
        {(Comp, value, id) => {
          expect(typeof Comp).toBe('function');
          expect(value).toBe('foo');
          expect(id).toBeDefined();

          return <div />;
        }}
      </RadioButtonController>,
    );
  });

  it('handles changes', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <RadioButtonController {...props} onChange={spy}>
        {(RB) => (
          <div>
            <RB value="foo" label="Foo" />
            <RB value="bar" label="Bar" />
            <RB value="baz" label="Baz" />
            <RB value="qux" label="Qux" />
          </div>
        )}
      </RadioButtonController>,
    );
    const buttons = wrapper.find('Proxy(RadioButton)');

    buttons.at(1).shallow().simulate('change', true, 'bar', event);

    expect(spy).toHaveBeenCalledWith('bar', event);

    buttons.at(0).shallow().simulate('change', false, 'foo', event);

    expect(spy).toHaveBeenCalledWith('foo', event);

    buttons.at(1).shallow().simulate('change', false, 'bar', event);

    expect(spy).toHaveBeenCalledWith('bar', event);

    buttons.at(1).shallow().simulate('change', false, 'bar', event); // again

    expect(spy).toHaveBeenCalledWith('bar', event);
  });

  it('handles checked', () => {
    const wrapper = shallow<RadioButtonController>(
      <RadioButtonController<'foo' | 'bar' | 'baz' | 'qux'>
        {...props}
        value="foo"
        onChange={() => {}}
      >
        {(RB) => (
          <div>
            <RB value="foo" label="Foo" />
            <RB value="bar" label="Bar" />
            <RB value="baz" label="Baz" />
            <RB value="qux" label="Qux" />
          </div>
        )}
      </RadioButtonController>,
    );
    const buttons = wrapper.find('Proxy(RadioButton)');

    buttons.at(1).shallow().simulate('change', true, 'bar', event);

    expect(wrapper.state('value')).toBe('bar');

    buttons.at(0).shallow().simulate('change', true, 'foo', event);

    expect(wrapper.state('value')).toBe('foo');
  });

  it('doesnt trigger onChange if the same value', () => {
    const spy = jest.fn();
    const wrapper = shallow<RadioButtonController>(
      <RadioButtonController {...props} onChange={spy}>
        {(RB) => (
          <div>
            <RB value="foo" label="Foo" />
            <RB value="bar" label="Bar" />
            <RB value="baz" label="Baz" />
            <RB value="qux" label="Qux" />
          </div>
        )}
      </RadioButtonController>,
    );

    wrapper.find('Proxy(RadioButton)').at(0).shallow().simulate('change', true, 'foo', event);

    expect(wrapper.state('value')).toBe('foo');

    expect(spy).not.toHaveBeenCalled();
  });

  it('hides optional label for children', () => {
    const wrapper = shallow(
      <RadioButtonController {...props} optional>
        {(RB) => (
          <div>
            <RB value="foo" label="Foo" />
          </div>
        )}
      </RadioButtonController>,
    );

    expect(wrapper.find('Proxy(RadioButton)').shallow().prop('hideOptionalLabel')).toBe(true);
  });
});
