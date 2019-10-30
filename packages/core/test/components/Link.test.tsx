import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Link from '../../src/components/Link';
import ButtonOrLink from '../../src/components/private/ButtonOrLink';

describe('<Link />', () => {
  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallowWithStyles(
        <Link muted inverted href="/">
          Default
        </Link>,
      );
    }).toThrow();
  });

  it('errors when multiple sizes are used at once', () => {
    expect(() => {
      shallowWithStyles(
        <Link small large href="/">
          Default
        </Link>,
      );
    }).toThrow();
  });

  it('renders small (passes to `Text`)', () => {
    const wrapper = shallowWithStyles(
      <Link small href="/">
        Small
      </Link>,
    );

    expect(wrapper.prop('small')).toBe(true);
  });

  it('renders large (passes to `Text`)', () => {
    const wrapper = shallowWithStyles(
      <Link large href="/">
        Large
      </Link>,
    );

    expect(wrapper.prop('large')).toBe(true);
  });

  it('renders disabled', () => {
    const wrapper = shallowWithStyles(
      <Link disabled href="/">
        Disabled
      </Link>,
    );

    expect(wrapper.find(ButtonOrLink).prop('className')).toMatch('link_disabled');
  });

  it('renders inverted', () => {
    const wrapper = shallowWithStyles(
      <Link inverted href="/">
        Inverted
      </Link>,
    );

    expect(wrapper.find(ButtonOrLink).prop('className')).toMatch('link_inverted');
  });

  it('renders muted', () => {
    const wrapper = shallowWithStyles(
      <Link muted href="/">
        Muted
      </Link>,
    );

    expect(wrapper.find(ButtonOrLink).prop('className')).toMatch('link_muted');
  });

  it('renders the child component with an inline=false prop when block prop is passed', () => {
    const wrapper = shallowWithStyles(
      <Link block href="/foo">
        foo
      </Link>,
      true,
    );

    expect(wrapper.dive().prop('inline')).toBe(false);
  });

  it('renders bold (passes to `Text`)', () => {
    const wrapper = shallowWithStyles(
      <Link bold href="/">
        Bold
      </Link>,
    );

    expect(wrapper.prop('bold')).toBe(true);
  });
});
