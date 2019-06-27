import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Shimmer, { Shimmer as BaseShimmer } from '../../src/components/Shimmer';

describe('<Shimmer />', () => {
  it('renders default', () => {
    const wrapper = shallowWithStyles(<Shimmer />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders block', () => {
    const wrapper = shallowWithStyles(<Shimmer block />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with custom dimensions', () => {
    const wrapper = shallowWithStyles(<Shimmer width={100} height="1em" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with custom border radius', () => {
    const wrapper = shallowWithStyles(<Shimmer radius="50%" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('doesnt change random width between renders', () => {
    const wrapper = shallowWithStyles(<Shimmer width="random" />);
    const width = (wrapper.instance() as BaseShimmer).randomWidth;

    wrapper.update();

    expect(width).toBe((wrapper.instance() as BaseShimmer).randomWidth);
  });
});
