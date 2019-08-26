import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import ProfilePhoto from '../../src/components/ProfilePhoto';

describe('<ProfilePhoto />', () => {
  const imageSrc = 'https://domain.com/some/file.jpg';
  const title = 'Name';
  const props = {
    imageSrc,
    title,
  };

  it('renders with the expected props (but not necessarily with the expected styles)', () => {
    const wrapper = shallowWithStyles(<ProfilePhoto {...props} />);

    expect(wrapper.prop('className')).toMatch('regular');
  });

  it('correctly sets the image title', () => {
    const wrapper = shallowWithStyles(<ProfilePhoto {...props} />);

    expect(wrapper.find(`img[title="${title}"]`)).toHaveLength(1);
  });

  it('renders inline', () => {
    const wrapper = shallowWithStyles(<ProfilePhoto {...props} inline />);

    expect(wrapper.prop('className')).toMatch('inline');
  });

  it('renders small', () => {
    const wrapper = shallowWithStyles(<ProfilePhoto {...props} small />);

    expect(wrapper.prop('className')).toMatch('small');
  });

  it('renders large', () => {
    const wrapper = shallowWithStyles(<ProfilePhoto {...props} large />);

    expect(wrapper.prop('className')).toMatch('large');
  });

  it('renders macro', () => {
    const wrapper = shallowWithStyles(<ProfilePhoto {...props} macro />);

    expect(wrapper.prop('className')).toMatch('macro');
  });

  it('renders custom size', () => {
    const wrapper = shallowWithStyles(<ProfilePhoto {...props} size={8} />);

    expect(wrapper.prop('className')).toMatch('inline-0');
  });

  it('uses fallback image', () => {
    const wrapper = shallowWithStyles(
      <ProfilePhoto {...props} imageSrc="broken" fallbackImageSrc={imageSrc} />,
    );

    wrapper.find('img').simulate('load');
    wrapper.find('img').simulate('error');

    expect(wrapper.find('img').prop('src')).toBe(imageSrc);
  });

  it('updates state value when props change', () => {
    const wrapper = shallowWithStyles(<ProfilePhoto {...props} />);

    expect(wrapper.state('src')).toEqual(imageSrc);

    wrapper.setProps({
      imageSrc: 'bar',
    });

    expect(wrapper.state('src')).toEqual('bar');
  });
});
