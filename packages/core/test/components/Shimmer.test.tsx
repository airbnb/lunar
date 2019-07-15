import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Shimmer, { Shimmer as BaseShimmer } from '../../src/components/Shimmer';

describe('<Shimmer />', () => {
  it('renders default', () => {
    const wrapper = shallowWithStyles(<Shimmer />);

    expect(wrapper.prop('className')).toBe('shimmer');
  });

  it('renders block', () => {
    const wrapper = shallowWithStyles(<Shimmer block />);

    expect(wrapper.prop('className')).toBe('shimmer shimmer_block');
  });

  it('renders with custom dimensions', () => {
    const wrapper = shallowWithStyles(<Shimmer width={100} height="1em" />);

    expect(wrapper.prop('style')).toEqual(
      expect.objectContaining({
        width: 100,
        height: '1em',
      }),
    );
  });

  it('renders with custom border radius', () => {
    const wrapper = shallowWithStyles(<Shimmer radius="50%" />);

    expect(wrapper.prop('style')).toEqual(
      expect.objectContaining({
        borderRadius: '50%',
      }),
    );
  });

  it('doesnt change random width between renders', () => {
    const wrapper = shallowWithStyles(<Shimmer width="random" />);
    const width = (wrapper.instance() as BaseShimmer).randomWidth;

    wrapper.update();

    expect(width).toBe((wrapper.instance() as BaseShimmer).randomWidth);
  });
});
