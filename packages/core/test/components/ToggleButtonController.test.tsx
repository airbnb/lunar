import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import ToggleButtonController from '../../src/components/ToggleButtonController';

describe('<ToggleButtonController />', () => {
  const props = {
    id: 'foo',
    name: 'bg',
    value: 'foo',
    label: 'Label',
    onChange() {},
  };

  function clickButton(wrapper: Enzyme.ShallowWrapper, value: any): Enzyme.ShallowWrapper {
    return wrapper
      .find({ value })
      .dive()
      .simulate('click', { currentTarget: { value } });
  }

  it('sets default value', () => {
    const wrapper = shallow(
      <ToggleButtonController {...props}>{() => <div />}</ToggleButtonController>,
    );

    expect(wrapper.state('value')).toEqual('foo');
  });

  it('updates state value when props change', () => {
    const wrapper = shallow(
      <ToggleButtonController {...props}>{() => <div />}</ToggleButtonController>,
    );

    wrapper.setProps({
      value: 'bar',
    });

    expect(wrapper.state('value')).toEqual('bar');
  });

  it('passes proxy component and current value to function child', () => {
    shallow(
      <ToggleButtonController {...props}>
        {(Comp, values) => {
          expect(typeof Comp).toBe('function');
          expect(values).toEqual('foo');

          return <div />;
        }}
      </ToggleButtonController>,
    );
  });

  it('does not notify of click that does not cause change', () => {
    const onChange = jest.fn();
    const wrapper = shallowWithStyles(
      <ToggleButtonController {...props} onChange={onChange} value="1">
        {ProxyButton => (
          <div>
            <ProxyButton value="1">1</ProxyButton>
            <ProxyButton value="2">2</ProxyButton>
            <ProxyButton value="3">3</ProxyButton>
          </div>
        )}
      </ToggleButtonController>,
    ).dive();

    clickButton(wrapper, '1');

    expect(onChange).not.toHaveBeenCalled();
  });

  it('handles calls onChange when value changes', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <ToggleButtonController {...props} onChange={onChange}>
        {ProxyButton => (
          <div>
            <ProxyButton value="1">1</ProxyButton>
            <ProxyButton value="2">2</ProxyButton>
            <ProxyButton value="3">3</ProxyButton>
          </div>
        )}
      </ToggleButtonController>,
    );

    clickButton(wrapper, '1');
    expect(onChange).toHaveBeenCalledWith('1', { currentTarget: { value: '1' } });

    clickButton(wrapper, '2');
    expect(onChange).toHaveBeenCalledWith('2', { currentTarget: { value: '2' } });

    clickButton(wrapper, '3');
    expect(onChange).toHaveBeenCalledWith('3', { currentTarget: { value: '3' } });
  });

  it('inverts inactive buttons', () => {
    const wrapper = shallow(
      <ToggleButtonController {...props} value="1">
        {ProxyButton => (
          <div>
            <ProxyButton value="1">1</ProxyButton>
            <ProxyButton value="2">2</ProxyButton>
            <ProxyButton value="3">3</ProxyButton>
          </div>
        )}
      </ToggleButtonController>,
    );

    expect(
      wrapper
        .find({ value: '1' })
        .dive()
        .prop('inverted'),
    ).toBeFalsy();

    expect(
      wrapper
        .find({ value: '2' })
        .dive()
        .prop('inverted'),
    ).toBeTruthy();

    expect(
      wrapper
        .find({ value: '3' })
        .dive()
        .prop('inverted'),
    ).toBeTruthy();
  });
});
