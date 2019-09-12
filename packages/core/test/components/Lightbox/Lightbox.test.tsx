import React from 'react';
import { shallow } from 'enzyme';
import Sheet from '../../../src/components/Sheet';
import Lightbox from '../../../src/components/Lightbox';
import LightboxImage from '../../../src/components/Lightbox/LightboxImage';

describe('<Lightbox />', () => {
  const requestIdleCallbackSpy = jest.fn();
  window.requestIdleCallback = requestIdleCallbackSpy;
  const props = {
    onClose: () => {},
    images: [{ alt: 'foo', src: 'bar' }],
    startIndex: 0,
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders a Sheet component', () => {
    const wrapper = shallow(<Lightbox {...props} />);

    expect(wrapper.find(Sheet)).toHaveLength(1);
    expect(wrapper.find(LightboxImage)).toHaveLength(1);
  });

  describe('preloadedUrls', () => {
    it('does not preload images when image count = 1', () => {
      shallow(<Lightbox {...props} />);

      expect(requestIdleCallbackSpy).toHaveBeenCalledTimes(0);
    });

    it('preloads images when image count > 1', () => {
      const images = [{ alt: 'foo', src: 'bar' }, { alt: 'foo2', src: 'bar2' }];
      shallow(<Lightbox {...props} images={images} />);

      expect(requestIdleCallbackSpy).toHaveBeenCalled();
    });
  });

  describe('startIndex', () => {
    it('sets activeIndex to startIndex if they are not equal', () => {
      const newProps = {
        ...props,
        images: [{ alt: 'foo', src: 'bar' }, { alt: 'foo2', src: 'bar2' }],
        startIndex: 1,
      };
      const wrapper = shallow(<Lightbox {...newProps} />);

      expect(wrapper.state()).toEqual(expect.objectContaining({ activeIndex: 1 }));
    });

    it('leaves activeIndex as default if startIndex is greater than image length', () => {
      const newProps = {
        ...props,
        startIndex: 1,
      };
      const wrapper = shallow(<Lightbox {...newProps} />);

      expect(wrapper.state()).toEqual(expect.objectContaining({ activeIndex: 0 }));
    });
  });
});
