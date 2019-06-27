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
    expect(wrapper).toMatchSnapshot();
  });

  it('correctly sets the image title', () => {
    const wrapper = shallowWithStyles(<ProfilePhoto {...props} />);
    expect(wrapper.find(`img[title="${title}"]`)).toHaveLength(1);
  });

  it('renders inline', () => {
    const wrapper = shallowWithStyles(<ProfilePhoto {...props} inline />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders small', () => {
    const wrapper = shallowWithStyles(<ProfilePhoto {...props} small />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders large', () => {
    const wrapper = shallowWithStyles(<ProfilePhoto {...props} large />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders macro', () => {
    const wrapper = shallowWithStyles(<ProfilePhoto {...props} macro />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders custom size', () => {
    const wrapper = shallowWithStyles(<ProfilePhoto {...props} size={8} />);

    expect(wrapper).toMatchSnapshot();
  });
});
