import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Sheet from '../../../src/components/Sheet';
import Button from '../../../src/components/Button';
import IconButton from '../../../src/components/IconButton';
import { ZoomControls, RotateControls } from '../../../src/components/ImageViewer';
import Lightbox, { LightboxProps, LightboxState } from '../../../src/components/Lightbox';
import LightboxImage from '../../../src/components/Lightbox/Image';
import LightboxHeader from '../../../src/components/Lightbox/Header';

describe('<Lightbox />', () => {
  const requestIdleCallbackSpy = jest.fn();
  const oldRIC = window.requestIdleCallback;
  let wrapper: Enzyme.ShallowWrapper<LightboxProps, LightboxState>;

  const props = {
    onClose: () => {},
    images: [{ alt: 'foo', src: 'bar' }],
    startIndex: 0,
  };

  beforeEach(() => {
    window.requestIdleCallback = requestIdleCallbackSpy;
  });

  afterEach(() => {
    window.requestIdleCallback = oldRIC;
    jest.resetAllMocks();
  });

  it('renders a Sheet component', () => {
    wrapper = shallow(<Lightbox {...props} />);

    expect(wrapper.find(Sheet)).toHaveLength(1);
    expect(wrapper.find(LightboxImage)).toHaveLength(1);
    // @ts-ignore
    expect(wrapper.find(Sheet).prop('header').type).toBe(LightboxHeader);
  });

  describe('preloadedUrls', () => {
    it('does not preload images when image count = 1', () => {
      shallow(<Lightbox {...props} />);

      expect(requestIdleCallbackSpy).toHaveBeenCalledTimes(0);
    });

    it('preloads images when image count > 1', () => {
      const images = [
        { alt: 'requestIdleTest', src: 'bar' },
        { alt: 'foo2', src: 'bar2' },
      ];
      shallow(<Lightbox {...props} images={images} />);

      expect(requestIdleCallbackSpy).toHaveBeenCalled();
    });
  });

  describe('startIndex', () => {
    it('sets activeIndex to startIndex if they are not equal', () => {
      const newProps = {
        ...props,
        images: [
          { alt: 'foo', src: 'bar' },
          { alt: 'foo2', src: 'bar2' },
        ],
        startIndex: 1,
      };
      wrapper = shallow(<Lightbox {...newProps} />);

      expect(wrapper.state()).toEqual(expect.objectContaining({ activeIndex: 1 }));
    });

    it('leaves activeIndex as default if startIndex is greater than image length', () => {
      const newProps = {
        ...props,
        startIndex: 1,
      };
      wrapper = shallow(<Lightbox {...newProps} />);

      expect(wrapper.state()).toEqual(expect.objectContaining({ activeIndex: 0 }));
    });
  });

  it('toggles the sidebar state', () => {
    const images = [{ alt: 'foo', src: 'bar', aside: <div>Hello</div> }];
    const wrapperMount = mount(<Lightbox {...props} images={images} />);
    expect(wrapperMount.state('hideAside')).toBe(false);

    wrapperMount.find(Button).simulate('click');

    expect(wrapperMount.state('hideAside')).toBe(true);
  });

  it('sets the scale state', () => {
    const wrapperMount = mount(<Lightbox {...props} showZoomControls />);
    expect(wrapperMount.state('scale')).toBe(1);

    wrapperMount
      .find(ZoomControls)
      .find(IconButton)
      .at(1)
      .simulate('click');

    expect(wrapperMount.state('scale')).toBe(1.5);
  });

  it('sets the rotation state', () => {
    const wrapperMount = mount(<Lightbox {...props} showRotateControls />);
    expect(wrapperMount.state('rotation')).toBe(0);

    wrapperMount
      .find(RotateControls)
      .find(IconButton)
      .at(1)
      .simulate('click');

    expect(wrapperMount.state('rotation')).toBe(90);
  });
});
