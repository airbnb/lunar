import React from 'react';
import { shallow } from 'enzyme';
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
      const wrapper = shallow(<ResponsiveImage shimmer={shimmer} {...props} />).dive();
      expect(wrapper).toMatchSnapshot();
    });

    it('renders the image with state={ imageLoaded: true }', () => {
      const wrapper = shallow(<ResponsiveImage shimmer={shimmer} {...props} />).dive();
      wrapper.setState({ imageLoaded: true });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('without a shimmer prop', () => {
    it('renders the image element while the image is loading', () => {
      const wrapper = shallow(<ResponsiveImage {...props} />).dive();
      expect(wrapper).toMatchSnapshot();
    });

    it('renders the image element with state={ imageLoaded: true }', () => {
      const wrapper = shallow(<ResponsiveImage {...props} />).dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
