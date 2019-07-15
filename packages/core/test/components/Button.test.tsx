import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import Button from '../../src/components/Button';
import Loader from '../../src/components/Loader';

describe('<Button />', () => {
  it('can change `type` of button', () => {
    const wrapper = shallowWithStyles(<Button type="submit">Button</Button>);

    expect(wrapper.prop('type')).toBe('submit');
  });

  it('renders block', () => {
    const wrapper = shallowWithStyles(<Button block>Button</Button>);

    expect(wrapper.prop('className')).toMatch('button_block');
  });

  it('renders borderless', () => {
    const wrapper = shallowWithStyles(<Button borderless>Button</Button>);

    expect(wrapper.prop('className')).toMatch('button_borderless');
  });

  it('renders disabled', () => {
    const wrapper = shallowWithStyles(<Button disabled>Button</Button>);

    expect(wrapper.prop('className')).toMatch('button_disabled');
    expect(wrapper.prop('disabled')).toBe(true);
  });

  it('renders inverted', () => {
    const wrapper = shallowWithStyles(<Button inverted>Button</Button>);

    expect(wrapper.prop('className')).toMatch('button_inverted');
  });

  it('renders large', () => {
    const wrapper = shallowWithStyles(<Button large>Button</Button>);

    expect(wrapper.prop('className')).toMatch('button_large');
  });

  it('renders loading', () => {
    const child = <div>Button</div>;
    const wrapper = shallowWithStyles(<Button loading>{child}</Button>);

    expect(wrapper.prop('className')).toMatch('button_disabled button_loading');
    expect(wrapper.find(Loader)).toHaveLength(1);
    expect(wrapper.contains(child)).toBe(false);
  });

  it('renders small', () => {
    const wrapper = shallowWithStyles(<Button small>Button</Button>);

    expect(wrapper.prop('className')).toMatch('button_small');
  });

  it('renders loading instead of icons', () => {
    const beforeIcon = <IconCheck decorative />;
    const afterIcon = <IconCheck decorative />;
    const wrapper = shallowWithStyles(
      <Button loading beforeIcon={beforeIcon} afterIcon={afterIcon}>
        Default
      </Button>,
    );

    expect(wrapper.contains(beforeIcon)).toBe(false);
    expect(wrapper.contains(afterIcon)).toBe(false);
    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it('calls wrapped `onMouseUp`', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(<Button onMouseUp={spy}>Button</Button>);

    wrapper.simulate('mouseup', {
      currentTarget: {
        blur() {},
      },
    });

    expect(spy).toHaveBeenCalled();
  });
});
