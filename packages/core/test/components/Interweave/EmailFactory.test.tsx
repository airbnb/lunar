import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import EmailFactory from '../../../src/components/Interweave/factories/Email';

describe('linkFactory()', () => {
  const emailParts = {
    host: '',
    username: '',
  };

  it('renders a link', () => {
    const wrapper = shallowWithStyles(
      <EmailFactory emailParts={emailParts}>email@airbnb.com</EmailFactory>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('adds mailto: to emails', () => {
    const wrapper = shallowWithStyles(
      <EmailFactory emailParts={emailParts}>email@airbnb.com</EmailFactory>,
      true,
    );

    expect(wrapper.prop('href')).toBe('mailto:email@airbnb.com');
  });

  it('sets open in new window', () => {
    const wrapper = shallowWithStyles(
      <EmailFactory emailParts={emailParts} newWindow>
        email@airbnb.com
      </EmailFactory>,
      true,
    );

    expect(wrapper.prop('openInNewWindow')).toBe(true);
  });

  it('sets small prop on link', () => {
    const wrapper = shallowWithStyles(
      <EmailFactory emailParts={emailParts} newWindow small>
        email@airbnb.com
      </EmailFactory>,
      true,
    );

    expect(wrapper.prop('small')).toBe(true);
    expect(wrapper.prop('large')).toBe(false);
  });

  it('sets large prop on link', () => {
    const wrapper = shallowWithStyles(
      <EmailFactory emailParts={emailParts} newWindow large>
        email@airbnb.com
      </EmailFactory>,
      true,
    );

    expect(wrapper.prop('small')).toBe(false);
    expect(wrapper.prop('large')).toBe(true);
  });
});
