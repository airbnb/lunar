import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Button from '../../../src/components/Button';
import Pagination from '../../../src/components/Pagination';
import Header from '../../../src/components/Lightbox/Header';
import { RotateControls, ZoomControls } from '../../../src/components/ImageViewer';
import IconButton from '../../../src/components/IconButton';
import { ARROW_RIGHT, ARROW_LEFT } from '../../../src/keys';

describe('<LightboxHeader />', () => {
  const onChangeSlideSpy = jest.fn();
  const onToggleAsideSpy = jest.fn();
  const props = {
    activeIndex: 0,
    imageCount: 5,
    onChangeSlide: onChangeSlideSpy,
    onToggleAside: onToggleAsideSpy,
  };

  it('renders a Pagination component', () => {
    const wrapper = shallow(<Header {...props} />).dive();

    expect(wrapper.find(Pagination)).toHaveLength(1);
  });

  describe('renders a toggle info Button', () => {
    it('with "Hide Info" if hideAside is false', () => {
      const wrapper = shallow(<Header {...props} hasAside />).dive();

      expect(
        wrapper
          .find(Button)
          .at(0)
          .prop('children'),
      ).toBe('Hide Info');
    });

    it('with "Show Info" if hideAside is true', () => {
      const wrapper = shallow(<Header {...props} hasAside hideAside />).dive();

      expect(
        wrapper
          .find(Button)
          .at(0)
          .prop('children'),
      ).toBe('Show Info');
    });
  });

  describe('handles keydown events', () => {
    let wrapper: Enzyme.ShallowWrapper<null, null, Header<any>>;
    const spy = jest.fn();

    beforeEach(() => {
      wrapper = shallow(<Header {...props} onChangeSlide={spy} />).dive();
    });

    it('changes slide to next on right arrow', () => {
      const event = new KeyboardEvent('keydown', {
        key: ARROW_RIGHT,
      });
      window.dispatchEvent(event);

      expect(spy).toBeCalledWith(1);
    });

    it('changes slide to previous on left arrow', () => {
      wrapper.setProps({ activeIndex: 1, imageCount: 2 });
      const event = new KeyboardEvent('keydown', {
        key: ARROW_LEFT,
      });
      window.dispatchEvent(event);

      expect(spy).toBeCalledWith(0);
    });

    it('changes slide to first on shift + left arrow', () => {
      wrapper.setProps({ activeIndex: 2, imageCount: 3 });
      const event = new KeyboardEvent('keydown', {
        key: ARROW_LEFT,
        shiftKey: true,
      });
      window.dispatchEvent(event);

      expect(spy).toBeCalledWith(0);
    });

    it('changes slide to first on shift + right arrow', () => {
      wrapper.setProps({ activeIndex: 0, imageCount: 3 });
      const event = new KeyboardEvent('keydown', {
        key: ARROW_RIGHT,
        shiftKey: true,
      });
      window.dispatchEvent(event);

      expect(spy).toBeCalledWith(2);
    });
  });

  describe('componentWillUnmount()', () => {
    it('removes event listener for keydown on umount', () => {
      const eventSpy = jest.spyOn(window, 'removeEventListener');

      const wrapper = shallow(<Header {...props} />).dive();
      // @ts-ignore
      wrapper.instance().componentWillUnmount();

      expect(eventSpy).toHaveBeenCalled();
    });
  });

  describe('rotate controls', () => {
    let wrapper: Enzyme.ShallowWrapper<null, null, Header<any>>;
    const spy = jest.fn();

    beforeEach(() => {
      wrapper = shallow(<Header {...props} showRotateControls onRotateImage={spy} />).dive();
    });

    it('renders rotate controls', () => {
      expect(wrapper.find(RotateControls)).toHaveLength(1);
    });

    it('calls onRotateImage', () => {
      wrapper.instance().handleRotate(90);

      expect(spy).toBeCalledWith(90);
    });
  });

  describe('zoom controls', () => {
    let wrapper: Enzyme.ShallowWrapper<null, null, Header<any>>;
    const spy = jest.fn();

    beforeEach(() => {
      wrapper = shallow(<Header {...props} showZoomControls onZoomImage={spy} />).dive();
    });

    it('renders zoom controls', () => {
      expect(wrapper.find(ZoomControls)).toHaveLength(1);
    });

    it('calls onZoomImage', () => {
      wrapper.instance().handleZoom(1);

      expect(spy).toBeCalledWith(1);
    });
  });
});
