import React from 'react';
import { mountUseStyles } from '@airbnb/lunar-test-utils';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import ButtonOrLink from '../../src/components/private/ButtonOrLink';
import Button from '../../src/components/Button';
import Loader from '../../src/components/Loader';

describe('<Button />', () => {
  it('can change `type` of button', () => {
    const wrapper = mountUseStyles(<Button type="submit">Button</Button>);

    expect(wrapper.find(ButtonOrLink).prop('type')).toBe('submit');
  });

  it('renders block', () => {
    const wrapper = mountUseStyles(<Button block>Button</Button>);

    expect(wrapper.find(ButtonOrLink).prop('className')).toMatch('button_block');
  });

  it('renders borderless', () => {
    const wrapper = mountUseStyles(<Button borderless>Button</Button>);

    expect(wrapper.find(ButtonOrLink).prop('className')).toMatch('button_borderless');
  });

  it('renders disabled', () => {
    const wrapper = mountUseStyles(<Button disabled>Button</Button>);

    expect(wrapper.find(ButtonOrLink).prop('className')).toMatch('button_disabled');
    expect(wrapper.find(ButtonOrLink).prop('disabled')).toBe(true);
  });

  it('renders inverted', () => {
    const wrapper = mountUseStyles(<Button inverted>Button</Button>);

    expect(wrapper.find(ButtonOrLink).prop('className')).toMatch('button_inverted');
  });

  it('renders large', () => {
    const wrapper = mountUseStyles(<Button large>Button</Button>);

    expect(wrapper.find(ButtonOrLink).prop('className')).toMatch('button_large');
  });

  it('renders loading', () => {
    const child = <div>Button</div>;
    const wrapper = mountUseStyles(<Button loading>{child}</Button>);

    expect(wrapper.find(ButtonOrLink).prop('className')).toMatch('button_disabled button_loading');
    expect(wrapper.find(Loader)).toHaveLength(1);
    expect(wrapper.contains(child)).toBe(false);
  });

  it('renders small', () => {
    const wrapper = mountUseStyles(<Button small>Button</Button>);

    expect(wrapper.find(ButtonOrLink).prop('className')).toMatch('button_small');
  });

  it('renders loading instead of icons', () => {
    const beforeIcon = <IconCheck decorative />;
    const afterIcon = <IconCheck decorative />;
    const wrapper = mountUseStyles(
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
    const wrapper = mountUseStyles(<Button onMouseUp={spy}>Button</Button>);

    wrapper.simulate('mouseup', {
      currentTarget: {
        blur() {},
      },
    });

    expect(spy).toHaveBeenCalled();
  });
});
