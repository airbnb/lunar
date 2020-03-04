import React from 'react';
import { mountUseStyles } from '@airbnb/lunar-test-utils';
import Link from '../../src/components/Link';
import ButtonOrLink from '../../src/components/private/ButtonOrLink';
import Text from '../../src/components/Text';

describe('<Link />', () => {
  it('errors when multiple states are used at once', () => {
    expect(() => {
      mountUseStyles(
        <Link muted inverted href="/">
          Default
        </Link>,
      );
    }).toThrow();
  });

  it('errors when multiple sizes are used at once', () => {
    expect(() => {
      mountUseStyles(
        <Link small large href="/">
          Default
        </Link>,
      );
    }).toThrow();
  });

  it('renders micro (passes to `Text`)', () => {
    const wrapper = mountUseStyles(
      <Link micro href="/">
        Micro
      </Link>,
    );

    expect(wrapper.prop('micro')).toBe(true);
  });

  it('renders small (passes to `Text`)', () => {
    const wrapper = mountUseStyles(
      <Link small href="/">
        Small
      </Link>,
    );

    expect(wrapper.prop('small')).toBe(true);
  });

  it('renders large (passes to `Text`)', () => {
    const wrapper = mountUseStyles(
      <Link large href="/">
        Large
      </Link>,
    );

    expect(wrapper.prop('large')).toBe(true);
  });

  it('renders disabled', () => {
    const wrapper = mountUseStyles(
      <Link disabled href="/">
        Disabled
      </Link>,
    );

    expect(wrapper.find(ButtonOrLink).prop('className')).toMatch('link_disabled');
  });

  it('renders inverted', () => {
    const wrapper = mountUseStyles(
      <Link inverted href="/">
        Inverted
      </Link>,
    );

    expect(wrapper.find(ButtonOrLink).prop('className')).toMatch('link_inverted');
  });

  it('renders muted', () => {
    const wrapper = mountUseStyles(
      <Link muted href="/">
        Muted
      </Link>,
    );

    expect(wrapper.find(ButtonOrLink).prop('className')).toMatch('link_muted');
  });

  it('renders the child component with an inline=false prop when block prop is passed', () => {
    const wrapper = mountUseStyles(
      <Link block href="/foo">
        foo
      </Link>,
    );

    expect(wrapper.find(Text).prop('inline')).toBe(false);
  });

  it('renders bold (passes to `Text`)', () => {
    const wrapper = mountUseStyles(
      <Link bold href="/">
        Bold
      </Link>,
    );

    expect(wrapper.prop('bold')).toBe(true);
  });

  it('passes text props', () => {
    const wrapper = mountUseStyles(
      <Link textProps={{ noWrap: true, preserveWhitespace: true }} href="/foo">
        foo
      </Link>,
    );

    expect(wrapper.find(Text).prop('preserveWhitespace')).toBe(true);
  });
});
