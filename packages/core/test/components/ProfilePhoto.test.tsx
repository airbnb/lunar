import React from 'react';
import { mountUseStyles } from '@airbnb/lunar-test-utils';
import ProfilePhoto from '../../src/components/ProfilePhoto';

describe('<ProfilePhoto />', () => {
  const imageSrc = 'https://domain.com/some/file.jpg';
  const title = 'Name';
  const props = {
    imageSrc,
    title,
  };

  it('renders with the expected props (but not necessarily with the expected styles)', () => {
    const wrapper = mountUseStyles(<ProfilePhoto {...props} />);

    expect(wrapper.find('div').prop('className')).toMatch('regular');
  });

  it('correctly sets the image title', () => {
    const wrapper = mountUseStyles(<ProfilePhoto {...props} />);

    expect(wrapper.find(`img[title="${title}"]`)).toHaveLength(1);
  });

  it('renders inline', () => {
    const wrapper = mountUseStyles(<ProfilePhoto {...props} inline />);

    expect(wrapper.find('div').prop('className')).toMatch('inline');
  });

  it('renders small', () => {
    const wrapper = mountUseStyles(<ProfilePhoto {...props} small />);

    expect(wrapper.find('div').prop('className')).toMatch('small');
  });

  it('renders large', () => {
    const wrapper = mountUseStyles(<ProfilePhoto {...props} large />);

    expect(wrapper.find('div').prop('className')).toMatch('large');
  });

  it('renders macro', () => {
    const wrapper = mountUseStyles(<ProfilePhoto {...props} macro />);

    expect(wrapper.find('div').prop('className')).toMatch('macro');
  });

  it('renders custom size', () => {
    const wrapper = mountUseStyles(<ProfilePhoto {...props} size={8} />);

    expect(wrapper.find('div').prop('className')).toMatch('inline-0');
  });

  it('uses fallback image', () => {
    const wrapper = mountUseStyles(
      <ProfilePhoto {...props} imageSrc="broken" fallbackImageSrc={imageSrc} />,
    );

    wrapper.find('img').simulate('error');

    wrapper.update();

    expect(wrapper.find('img').prop('src')).toBe(imageSrc);
  });

  it('updates state value when props change', () => {
    const wrapper = mountUseStyles(<ProfilePhoto {...props} />);

    expect(wrapper.find('img').prop('src')).toEqual(imageSrc);

    wrapper.setProps({
      imageSrc: 'bar',
    });

    wrapper.update();

    expect(wrapper.find('img').prop('src')).toEqual('bar');
  });
});
