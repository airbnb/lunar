import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Link from '../../src/components/Link';

describe('<Link />', () => {
  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallowWithStyles(
        <Link muted inverted href="#">
          Default
        </Link>,
      );
    }).toThrowError();
  });

  it('errors when multiple sizes are used at once', () => {
    expect(() => {
      shallowWithStyles(
        <Link small large href="#">
          Default
        </Link>,
      );
    }).toThrowError();
  });

  it('renders small', () => {
    const wrapper = shallowWithStyles(
      <Link small href="#">
        Small
      </Link>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders large', () => {
    const wrapper = shallowWithStyles(
      <Link large href="#">
        Large
      </Link>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders disabled', () => {
    const wrapper = shallowWithStyles(
      <Link disabled href="#">
        Disabled
      </Link>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inverted', () => {
    const wrapper = shallowWithStyles(
      <Link inverted href="#">
        Inverted
      </Link>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders muted', () => {
    const wrapper = shallowWithStyles(
      <Link muted href="#">
        Muted
      </Link>,
    );

    expect(wrapper).toMatchSnapshot();
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

  it('renders bold', () => {
    const wrapper = shallowWithStyles(
      <Link bold href="#">
        Bold
      </Link>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
