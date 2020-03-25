import React from 'react';
import { shallow } from 'enzyme';
import CheckBoxController from '../../src/components/CheckBoxController';

describe('<CheckBoxController />', () => {
  type Value = 'foo' | 'bar' | 'baz' | 'qux';

  const props = {
    name: 'cb',
    value: ['foo'],
    label: 'Label',
    onChange() {},
  };

  const event = {
    target: {},
  } as React.ChangeEvent<unknown>;

  it('sets default value', () => {
    const wrapper = shallow(<CheckBoxController {...props}>{() => <div />}</CheckBoxController>);

    expect(Array.from(wrapper.state('values'))).toEqual(['foo']);
  });

  it('updates state value when props change', () => {
    const wrapper = shallow(<CheckBoxController {...props}>{() => <div />}</CheckBoxController>);

    wrapper.setProps({
      value: ['bar'],
    });

    expect(Array.from(wrapper.state('values'))).toEqual(['bar']);
  });

  it('does nothing when value is the same', () => {
    const wrapper = shallow(<CheckBoxController {...props}>{() => <div />}</CheckBoxController>);

    wrapper.setProps({
      value: ['foo'],
    });

    expect(Array.from(wrapper.state('values'))).toEqual(['foo']);
  });

  it('passes correct args to function child', () => {
    shallow(
      <CheckBoxController {...props}>
        {(Comp, values, id) => {
          expect(typeof Comp).toBe('function');
          expect(values).toEqual(['foo']);
          expect(id).toBeDefined();

          return <div />;
        }}
      </CheckBoxController>,
    );
  });

  it('handles changes', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <CheckBoxController {...props} onChange={spy}>
        {(CB) => (
          <div>
            <CB value="foo" label="Foo" />
            <CB value="bar" label="Bar" />
            <CB value="baz" label="Baz" />
            <CB value="qux" label="Qux" />
          </div>
        )}
      </CheckBoxController>,
    );
    const buttons = wrapper.find('Proxy(CheckBox)');

    buttons.at(1).shallow().simulate('change', true, 'bar', event);

    expect(spy).toHaveBeenCalledWith(['foo', 'bar'], event);

    buttons.at(1).shallow().simulate('change', true, 'bar', event); // Dupe

    expect(spy).toHaveBeenCalledWith(['foo', 'bar'], event);

    buttons.at(0).shallow().simulate('change', false, 'foo', event);

    expect(spy).toHaveBeenCalledWith(['bar'], event);

    buttons.at(1).shallow().simulate('change', false, 'bar', event);

    expect(spy).toHaveBeenCalledWith([], event);
  });

  it('handles checked', () => {
    const wrapper = shallow<CheckBoxController>(
      <CheckBoxController<Value> {...props} value={['foo']}>
        {(CB) => (
          <div>
            <CB value="foo" label="Foo" />
            <CB value="bar" label="Bar" />
            <CB value="baz" label="Baz" />
            <CB value="qux" label="Qux" />
          </div>
        )}
      </CheckBoxController>,
    );
    const buttons = wrapper.find('Proxy(CheckBox)');

    buttons.at(1).shallow().simulate('change', true, 'bar', event);

    expect(wrapper.state('values').has('bar')).toBe(true);
    expect(wrapper.state('values').has('foo')).toBe(true);

    buttons.at(1).shallow().simulate('change', false, 'bar', event);

    expect(wrapper.state('values').has('bar')).toBe(false);

    buttons.at(0).shallow().simulate('change', false, 'foo', event);

    expect(wrapper.state('values').has('foo')).toBe(false);
  });

  it('hides optional label for children', () => {
    const wrapper = shallow(
      <CheckBoxController {...props} optional>
        {(CB) => (
          <div>
            <CB value="foo" label="Foo" />
          </div>
        )}
      </CheckBoxController>,
    );

    expect(wrapper.find('Proxy(CheckBox)').shallow().prop('hideOptionalLabel')).toBe(true);
  });
});
