import React from 'react';
import { shallow } from 'enzyme';
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
    const wrapper = shallow(<UrlFactory urlParts={urlParts}>airbnb.com</UrlFactory>);

    expect(wrapper).toMatchSnapshot();
  });

  it('adds http:// to URL', () => {
    const wrapper = shallow(<UrlFactory urlParts={urlParts}>airbnb.com</UrlFactory>);

    expect(wrapper.prop('href')).toBe('http://airbnb.com');
  });

  it('doesnt add http:// to URL', () => {
    // eslint-disable-next-line react/jsx-curly-brace-presence
    const wrapper = shallow(<UrlFactory urlParts={urlParts}>{'https://airbnb.com'}</UrlFactory>);

    expect(wrapper.prop('href')).toBe('https://airbnb.com');
  });

  it('sets open in new window', () => {
    const wrapper = shallow(
      <UrlFactory urlParts={urlParts} newWindow>
        airbnb.com
      </UrlFactory>,
    );

    expect(wrapper.prop('openInNewWindow')).toBe(true);
  });

  it('sets small prop on link', () => {
    const wrapper = shallow(
      <UrlFactory urlParts={urlParts} small>
        airbnb.com
      </UrlFactory>,
    );

    expect(wrapper.prop('small')).toBe(true);
    expect(wrapper.prop('large')).toBe(false);
  });

  it('sets large prop on link', () => {
    const wrapper = shallow(
      <UrlFactory urlParts={urlParts} large>
        airbnb.com
      </UrlFactory>,
    );

    expect(wrapper.prop('large')).toBe(true);
    expect(wrapper.prop('small')).toBe(false);
  });
});
