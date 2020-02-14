import React from 'react';
import { mountUseStyles } from '@airbnb/lunar-test-utils';
import UrlFactory from '../../../src/components/Interweave/factories/Url';
import Link from '../../../src/components/Link';

describe('UrlFactory', () => {
  const urlParts = {
    auth: '',
    fragment: '',
    host: '',
    path: '',
    port: '',
    query: '',
    scheme: '',
  };

  it('renders a link', () => {
    const wrapper = mountUseStyles(
      <UrlFactory url="airbnb.com" urlParts={urlParts}>
        airbnb.com
      </UrlFactory>,
    );

    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it('adds http:// to URL', () => {
    const wrapper = mountUseStyles(
      <UrlFactory url="airbnb.com" urlParts={urlParts}>
        airbnb.com
      </UrlFactory>,
    );

    expect(wrapper.find(Link).prop('href')).toBe('http://airbnb.com');
  });

  it('doesnt add http:// to URL', () => {
    const wrapper = mountUseStyles(
      <UrlFactory url="https://airbnb.com" urlParts={urlParts}>
        https://airbnb.com
      </UrlFactory>,
    );

    expect(wrapper.find(Link).prop('href')).toBe('https://airbnb.com');
  });

  it('sets open in new window', () => {
    const wrapper = mountUseStyles(
      <UrlFactory newWindow url="airbnb.com" urlParts={urlParts}>
        airbnb.com
      </UrlFactory>,
    );

    expect(wrapper.find(Link).prop('openInNewWindow')).toBe(true);
  });

  it('sets small prop on link', () => {
    const wrapper = mountUseStyles(
      <UrlFactory small url="airbnb.com" urlParts={urlParts}>
        airbnb.com
      </UrlFactory>,
    );

    expect(wrapper.find(Link).prop('small')).toBe(true);
    expect(wrapper.find(Link).prop('large')).toBe(false);
  });

  it('sets large prop on link', () => {
    const wrapper = mountUseStyles(
      <UrlFactory large url="airbnb.com" urlParts={urlParts}>
        airbnb.com
      </UrlFactory>,
    );

    expect(wrapper.find(Link).prop('large')).toBe(true);
    expect(wrapper.find(Link).prop('small')).toBe(false);
  });
});
