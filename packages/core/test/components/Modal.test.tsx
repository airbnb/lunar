import React from 'react';
import ReactDOM from 'react-dom';
import { mountWithStyles, shallowWithStyles } from '@airbnb/lunar-test-utils';
import Modal, { Props } from '../../src/components/Modal';
import ModalImageLayout from '../../src/components/Modal/private/ImageLayout';
import ModalInner from '../../src/components/Modal/private/Inner';
import ModalInnerContent from '../../src/components/Modal/private/InnerContent';
import Spacing from '../../src/components/Spacing';
import Title from '../../src/components/Title';
import { ESCAPE } from '../../src/keys';
import focusFirstFocusableChild from '../../src/utils/focus/focusFirstFocusableChild';

jest.mock('../../src/utils/focus/focusFirstFocusableChild');

describe('<Modal />', () => {
  function setup(override = {}, isShallow = true) {
    const props: Props = {
      children: 'Modal content',
      onClose() {},
      title: 'Modal test',
      ...override,
    };

    const wrapper = isShallow
      ? shallowWithStyles(<Modal {...props} />)
      : mountWithStyles(<Modal {...props} />);

    return { wrapper };
  }

  it('makes a portal', () => {
    const portalSpy = jest.spyOn(ReactDOM, 'createPortal');
    const { wrapper } = setup({}, false /* isShallow */);

    expect(portalSpy).toHaveBeenCalled();

    wrapper.unmount();
    portalSpy.mockRestore();
  });

  it('closes the modal only when escape is pressed', () => {
    const closeSpy = jest.fn();
    const { wrapper } = setup({ onClose: closeSpy });

    wrapper.find('div[role="presentation"]').simulate('keyup', {});

    expect(closeSpy).not.toHaveBeenCalled();

    const event = new KeyboardEvent('keyup', {
      key: ESCAPE,
    });

    wrapper.find('div[role="presentation"]').simulate('keyup', event);

    expect(closeSpy).toHaveBeenCalled();
  });

  it('closes when clicked outside', () => {
    const closeSpy = jest.fn();

    const eventMap = {
      click: null,
      mouseup: null,
      mousedown: null,
    } as any;

    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb;
    });

    shallowWithStyles(<ModalInner onClose={closeSpy}>Foo</ModalInner>);

    eventMap.click();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('does not close when clicked on self', () => {
    const target = document.createElement('div');
    const closeSpy = jest.fn();

    const eventMap = {
      click: null,
      mouseup: null,
      mousedown: null,
    } as any;

    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb;
    });

    const wrapper = shallowWithStyles(<ModalInner onClose={closeSpy}>Foo</ModalInner>);
    const instance = wrapper.instance();

    // @ts-ignore
    instance.dialogRef = { current: target };

    eventMap.click({ preventDefault: jest.fn(), target });

    expect(closeSpy).toHaveBeenCalledTimes(0);
  });

  describe('componentDidMount', () => {
    it('adds event listener', () => {
      const eventSpy = jest.spyOn(document, 'addEventListener');

      shallowWithStyles(<ModalInner onClose={() => {}}>Foo</ModalInner>);

      expect(eventSpy).toHaveBeenCalledWith('click', expect.any(Function), true);

      eventSpy.mockRestore();
    });
  });

  describe('componentWillUnmount', () => {
    it('removes event listener', () => {
      const eventSpy = jest.spyOn(document, 'removeEventListener');

      const wrapper = shallowWithStyles(<ModalInner onClose={() => {}}>Foo</ModalInner>);

      // @ts-ignore
      wrapper.instance().componentWillUnmount();

      expect(eventSpy).toHaveBeenCalledWith('click', expect.any(Function), true);

      eventSpy.mockRestore();
    });
  });

  it('focuses the first element on open', () => {
    jest.useFakeTimers();
    setup({}, false /* isShallow */);

    jest.runAllTimers();
    jest.useRealTimers();

    expect(focusFirstFocusableChild).toHaveBeenCalled();
  });

  it('re-focuses on the last focused element on close', () => {
    const focused = document.createElement('input');
    document.body.appendChild(focused);
    focused.focus();

    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    clearTimeoutSpy.mockImplementation(() => {});

    const { wrapper } = setup({}, false /* isShallow */);

    wrapper.unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(document.activeElement).toBe(focused);

    clearTimeoutSpy.mockRestore();
  });

  it('renders an image layout when an image config is provided', () => {
    const imageConfig = {
      sizes: ['a', 'b'],
      type: 'center',
      url: 'some_image',
    };
    const { wrapper } = setup(
      {
        image: imageConfig,
      },
      false /* isShallow */,
    );

    const imageWrapper = wrapper.find(ModalImageLayout);
    expect(imageWrapper).toHaveLength(1);
    expect(imageWrapper.props()).toMatchObject(imageConfig);
    expect(imageWrapper.find('img')).toHaveLength(1);
    expect(imageWrapper.find('img').prop('sizes')).toMatch('a,b');
  });

  it('renders a covered image layout when an image config is provided', () => {
    const imageConfig = {
      sizes: ['a', 'b'],
      type: 'cover',
      url: 'some_image',
    };
    const { wrapper } = setup(
      {
        image: imageConfig,
      },
      false /* isShallow */,
    );

    const imageWrapper = wrapper.find(ModalImageLayout);
    expect(imageWrapper).toHaveLength(1);
    expect(imageWrapper.props()).toMatchObject(imageConfig);
    expect(imageWrapper.find('img')).toHaveLength(1);
    expect(imageWrapper.find('img').prop('sizes')).toBeFalsy();
  });

  it('renders standard content with an image config is not provided', () => {
    const { wrapper } = setup({}, false /* isShallow */);

    expect(wrapper.find(ModalImageLayout)).toHaveLength(0);
    expect(wrapper.find(ModalInnerContent)).toHaveLength(1);
  });

  it('renders a title', () => {
    const { wrapper } = setup(
      {
        title: 'Title wave',
      },
      false /* isShallow */,
    );

    const headerWrapper = wrapper
      .find(Spacing)
      .find({ tag: 'header' })
      .first();
    expect(headerWrapper.prop('bottom')).toEqual(3);

    const titleWrapper = wrapper.find(Title);
    expect(titleWrapper.prop('level')).toEqual(3);
    expect(titleWrapper.prop('children')).toBe('Title wave');
  });

  it('adjusts header spacing if no title is provided', () => {
    const { wrapper } = setup(
      {
        title: null,
      },
      false /* isShallow */,
    );

    const headerWrapper = wrapper
      .find(Spacing)
      .find({ tag: 'header' })
      .first();
    expect(headerWrapper.prop('bottom')).toEqual(0);
  });

  it('renders a footer, if provided', () => {
    const { wrapper } = setup(
      {
        footer: 'Modal footsies',
      },
      false /* isShallow */,
    );

    expect(wrapper.find('footer').prop('children')).toBe('Modal footsies');
  });
});
