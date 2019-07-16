import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Loader from '../../src/components/Loader';

describe('<Loader />', () => {
  it('renders default', () => {
    const wrapper = shallowWithStyles(<Loader />);

    expect(wrapper.prop('className')).toMatch('loader loader_absolute');
  });

  it('renders inline', () => {
    const wrapper = shallowWithStyles(<Loader inline />);

    expect(wrapper.prop('className')).toMatch('loader_inline');
  });

  it('renders inverted', () => {
    const wrapper = shallowWithStyles(<Loader inverted />);

    expect(
      wrapper
        .find('span')
        .at(0)
        .prop('className'),
    ).toMatch('dot_inverted');
  });

  it('renders large', () => {
    const wrapper = shallowWithStyles(<Loader large />);

    expect(
      wrapper
        .find('span')
        .at(0)
        .prop('className'),
    ).toMatch('dot_large');
  });

  it('renders static', () => {
    const wrapper = shallowWithStyles(<Loader static />);

    expect(wrapper.prop('className')).not.toMatch('loader_absolute');
  });
});
