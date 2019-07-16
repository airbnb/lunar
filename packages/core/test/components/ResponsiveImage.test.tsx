import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import ResponsiveImage from '../../src/components/ResponsiveImage';
import Shimmer from '../../src/components/Shimmer';

describe('<ResponsiveImage />', () => {
  const props = {
    src: 'foo',
    alt: 'bar',
    maxWidth: 200,
    maxHeight: 150,
  };

  describe('with a shimmer prop', () => {
    const shimmer = <Shimmer block />;

    it('renders the shimmer component while the image is loading', () => {
      const wrapper = shallowWithStyles(<ResponsiveImage shimmer={shimmer} {...props} />);

      expect(wrapper.find(Shimmer)).toHaveLength(1);
    });

    it('renders the image with state={ imageLoaded: true }', () => {
      const wrapper = shallowWithStyles(<ResponsiveImage shimmer={shimmer} {...props} />);

      wrapper.setState({ imageLoaded: true });

      expect(wrapper.find(Shimmer)).toHaveLength(0);
    });
  });

  describe('without a shimmer prop', () => {
    it('renders the image element while the image is loading', () => {
      const wrapper = shallowWithStyles(<ResponsiveImage {...props} />);

      expect(wrapper.find('img')).toHaveLength(1);
    });

    it('renders the image element with state={ imageLoaded: true }', () => {
      const wrapper = shallowWithStyles(<ResponsiveImage {...props} />);

      expect(wrapper.find('img')).toHaveLength(1);
    });
  });
});
