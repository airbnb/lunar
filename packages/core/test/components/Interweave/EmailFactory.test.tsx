import React from 'react';
import { shallow } from 'enzyme';
import EmailFactory from '../../../src/components/Interweave/factories/Email';

describe('linkFactory()', () => {
  const emailParts = {
    host: '',
    username: '',
  };

  it('renders a link', () => {
    const wrapper = shallow(<EmailFactory emailParts={emailParts}>email@airbnb.com</EmailFactory>);

    expect(wrapper).toMatchSnapshot();
  });

  it('adds mailto: to emails', () => {
    const wrapper = shallow(<EmailFactory emailParts={emailParts}>email@airbnb.com</EmailFactory>);

    expect(wrapper.prop('href')).toBe('mailto:email@airbnb.com');
  });

  it('sets open in new window', () => {
    const wrapper = shallow(
      <EmailFactory emailParts={emailParts} newWindow>
        email@airbnb.com
      </EmailFactory>,
    );

    expect(wrapper.prop('openInNewWindow')).toBe(true);
  });

  it('sets small prop on link', () => {
    const wrapper = shallow(
      <EmailFactory emailParts={emailParts} newWindow small>
        email@airbnb.com
      </EmailFactory>,
    );

    expect(wrapper.prop('small')).toBe(true);
    expect(wrapper.prop('large')).toBe(false);
  });

  it('sets large prop on link', () => {
    const wrapper = shallow(
      <EmailFactory emailParts={emailParts} newWindow large>
        email@airbnb.com
      </EmailFactory>,
    );

    expect(wrapper.prop('small')).toBe(false);
    expect(wrapper.prop('large')).toBe(true);
  });
});
