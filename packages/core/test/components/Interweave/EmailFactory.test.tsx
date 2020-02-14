import React from 'react';
import { mountUseStyles } from '@airbnb/lunar-test-utils';
import EmailFactory from '../../../src/components/Interweave/factories/Email';
import Link from '../../../src/components/Link';

describe('EmailFactory', () => {
  const emailParts = {
    host: '',
    username: '',
  };

  it('renders a link', () => {
    const wrapper = mountUseStyles(
      <EmailFactory email="email@airbnb.com" emailParts={emailParts}>
        email@airbnb.com
      </EmailFactory>,
    );

    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it('adds mailto: to emails', () => {
    const wrapper = mountUseStyles(
      <EmailFactory email="email@airbnb.com" emailParts={emailParts}>
        email@airbnb.com
      </EmailFactory>,
    );

    expect(wrapper.find(Link).prop('href')).toBe('mailto:email@airbnb.com');
  });

  it('sets open in new window', () => {
    const wrapper = mountUseStyles(
      <EmailFactory newWindow email="email@airbnb.com" emailParts={emailParts}>
        email@airbnb.com
      </EmailFactory>,
    );

    expect(wrapper.find(Link).prop('openInNewWindow')).toBe(true);
  });

  it('sets small prop on link', () => {
    const wrapper = mountUseStyles(
      <EmailFactory newWindow small email="email@airbnb.com" emailParts={emailParts}>
        email@airbnb.com
      </EmailFactory>,
    );

    expect(wrapper.find(Link).prop('small')).toBe(true);
    expect(wrapper.find(Link).prop('large')).toBe(false);
  });

  it('sets large prop on link', () => {
    const wrapper = mountUseStyles(
      <EmailFactory newWindow large email="email@airbnb.com" emailParts={emailParts}>
        email@airbnb.com
      </EmailFactory>,
    );

    expect(wrapper.find(Link).prop('small')).toBe(false);
    expect(wrapper.find(Link).prop('large')).toBe(true);
  });
});
