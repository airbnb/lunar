import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import UrlFactory from '../../../src/components/Interweave/factories/Url';

describe('linkFactory()', () => {
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
    const wrapper = shallowWithStyles(<UrlFactory urlParts={urlParts}>airbnb.com</UrlFactory>);

    expect(wrapper).toMatchSnapshot();
  });

  it('adds http:// to URL', () => {
    const wrapper = shallowWithStyles(
      <UrlFactory urlParts={urlParts}>airbnb.com</UrlFactory>,
      true,
    );

    expect(wrapper.prop('href')).toBe('http://airbnb.com');
  });

  it('doesnt add http:// to URL', () => {
    const wrapper = shallowWithStyles(
      <UrlFactory urlParts={urlParts}>https://airbnb.com</UrlFactory>,
      true,
    );

    expect(wrapper.prop('href')).toBe('https://airbnb.com');
  });

  it('sets open in new window', () => {
    const wrapper = shallowWithStyles(
      <UrlFactory newWindow urlParts={urlParts}>
        airbnb.com
      </UrlFactory>,
      true,
    );

    expect(wrapper.prop('openInNewWindow')).toBe(true);
  });

  it('sets small prop on link', () => {
    const wrapper = shallowWithStyles(
      <UrlFactory small urlParts={urlParts}>
        airbnb.com
      </UrlFactory>,
      true,
    );

    expect(wrapper.prop('small')).toBe(true);
    expect(wrapper.prop('large')).toBe(false);
  });

  it('sets large prop on link', () => {
    const wrapper = shallowWithStyles(
      <UrlFactory large urlParts={urlParts}>
        airbnb.com
      </UrlFactory>,
      true,
    );

    expect(wrapper.prop('large')).toBe(true);
    expect(wrapper.prop('small')).toBe(false);
  });
});
