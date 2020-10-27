import React from 'react';
import ReactDOM from 'react-dom';
import { mountWithStyles, shallowWithStyles } from '@airbnb/lunar-test-utils';
import Modal, { ModalProps } from '../../src/components/Modal';
import ModalImageLayout from '../../src/components/Modal/private/ImageLayout';
import ModalInner from '../../src/components/Modal/private/Inner';
import ModalInnerContent from '../../src/components/Modal/private/InnerContent';
import Text from '../../src/components/Text';
import Title from '../../src/components/Title';
import { ESCAPE } from '../../src/keys';
import focusFirstFocusableChild from '../../src/utils/focus/focusFirstFocusableChild';

jest.mock('../../src/utils/focus/focusFirstFocusableChild');

type EventMap = { [key: string]: ((event?: Event) => void) | null };

describe('<Modal />', () => {
  function setup(override = {}, isShallow = true) {
    const props: ModalProps = {
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

    const eventMap: EventMap = {
      click: null,
      mouseup: null,
      mousedown: null,
    };

    jest.spyOn(document, 'addEventListener').mockImplementation((event, cb) => {
      // @ts-ignore
      eventMap[event] = cb;
    });

    mountWithStyles(<ModalInner onClose={closeSpy}>Foo</ModalInner>);

    // @ts-ignore
    eventMap.click!({ target: null });

    expect(closeSpy).toHaveBeenCalled();
  });

  it('doesnt close when clicked outside and persist is enabled', () => {
    const closeSpy = jest.fn();

    const eventMap: EventMap = {
      click: null,
      mouseup: null,
      mousedown: null,
    };

    jest.spyOn(document, 'addEventListener').mockImplementation((event, cb) => {
      // @ts-ignore
      eventMap[event] = cb;
    });

    mountWithStyles(
      <ModalInner persistOnOutsideClick onClose={closeSpy}>
        Foo
      </ModalInner>,
    );

    // @ts-ignore
    eventMap.click!({ target: null });

    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('does not close when clicked on self', () => {
    const closeSpy = jest.fn();

    const eventMap: EventMap = {
      click: null,
      mouseup: null,
      mousedown: null,
    };

    jest.spyOn(document, 'addEventListener').mockImplementation((event, cb) => {
      // @ts-ignore
      eventMap[event] = cb;
    });

    const wrapper = mountWithStyles(<ModalInner onClose={closeSpy}>Foo</ModalInner>);

    // @ts-ignore
    eventMap.click!({ preventDefault: jest.fn(), target: wrapper.getDOMNode() });

    expect(closeSpy).toHaveBeenCalledTimes(0);
  });

  describe('event listener', () => {
    it('adds event listener', () => {
      const eventSpy = jest.spyOn(document, 'addEventListener');

      mountWithStyles(<ModalInner onClose={() => {}}>Foo</ModalInner>);

      expect(eventSpy).toHaveBeenCalledWith('click', expect.any(Function), true);

      eventSpy.mockRestore();
    });

    it('removes event listener', () => {
      const eventSpy = jest.spyOn(document, 'removeEventListener');

      const wrapper = mountWithStyles(<ModalInner onClose={() => {}}>Foo</ModalInner>);

      wrapper.unmount();

      expect(eventSpy).toHaveBeenCalledWith('click', expect.any(Function), true);

      eventSpy.mockRestore();
    });
  });

  it('different class for small size', () => {
    const wrapper = mountWithStyles(<ModalInner onClose={jest.fn()}>Foo</ModalInner>);
    const small = mountWithStyles(
      <ModalInner small onClose={jest.fn()}>
        Foo
      </ModalInner>,
    );

    expect(wrapper.getDOMNode().className).not.toBe(small.getDOMNode().className);
  });

  it('different class for large size', () => {
    const wrapper = mountWithStyles(<ModalInner onClose={jest.fn()}>Foo</ModalInner>);
    const large = mountWithStyles(
      <ModalInner large onClose={jest.fn()}>
        Foo
      </ModalInner>,
    );

    expect(wrapper.getDOMNode().className).not.toBe(large.getDOMNode().className);
  });

  it('same class for image as large size', () => {
    const wrapper = mountWithStyles(
      <ModalInner
        image={{
          type: 'center',
          url: 'some_image',
        }}
        onClose={jest.fn()}
      >
        Foo
      </ModalInner>,
    );
    const large = mountWithStyles(
      <ModalInner large onClose={jest.fn()}>
        Foo
      </ModalInner>,
    );

    expect(wrapper.getDOMNode().className).toBe(large.getDOMNode().className);
  });

  it('different class for fluid size', () => {
    const wrapper = mountWithStyles(<ModalInner onClose={jest.fn()}>Foo</ModalInner>);
    const fluid = mountWithStyles(
      <ModalInner fluid onClose={jest.fn()}>
        Foo
      </ModalInner>,
    );

    expect(wrapper.getDOMNode().className).not.toBe(fluid.getDOMNode().className);
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
    document.body.append(focused);
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

    expect(wrapper.find('header')).toHaveLength(1);

    const titleWrapper = wrapper.find(Title);
    expect(titleWrapper.prop('level')).toEqual(3);
    expect(titleWrapper.prop('children')).toBe('Title wave');
  });

  it('renders a subtitle', () => {
    const { wrapper } = setup(
      {
        title: 'Title wave',
        subtitle: 'Subtitle',
      },
      false /* isShallow */,
    );

    expect(wrapper.find('header')).toHaveLength(1);

    expect(wrapper.find('header').find(Text).prop('children')).toBe('Subtitle');
  });

  it('renders a top bar', () => {
    const { wrapper } = setup(
      {
        title: null,
        topBar: 'Top bar',
      },
      false /* isShallow */,
    );

    expect(wrapper.find('header')).toHaveLength(0);

    const div = wrapper.find(ModalInnerContent).find('div').at(1);
    expect(div.text()).toContain('Top bar');
  });

  it('no header if no title is provided', () => {
    const { wrapper } = setup(
      {
        title: null,
      },
      false /* isShallow */,
    );

    expect(wrapper.find('header')).toHaveLength(0);
  });

  it('no header if no title or subtitle are provided', () => {
    const { wrapper } = setup(
      {
        title: null,
        subtitle: null,
      },
      false /* isShallow */,
    );

    expect(wrapper.find('header')).toHaveLength(0);
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
