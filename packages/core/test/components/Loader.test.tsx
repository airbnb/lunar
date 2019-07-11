import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Loader from '../../src/components/Loader';

describe('<Loader />', () => {
  it('renders default', () => {
    const wrapper = shallowWithStyles(<Loader />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inline', () => {
    const wrapper = shallowWithStyles(<Loader inline />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inverted', () => {
    const wrapper = shallowWithStyles(<Loader inverted />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders large', () => {
    const wrapper = shallowWithStyles(<Loader large />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders static', () => {
    const wrapper = shallowWithStyles(<Loader static />);

    expect(wrapper).toMatchSnapshot();
  });
});
