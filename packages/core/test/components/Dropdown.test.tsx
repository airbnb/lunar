import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Dropdown from '../../src/components/Dropdown';

describe('<Dropdown />', () => {
  it('renders a div with style attributes', () => {
    const wrapper = shallowWithStyles(
      <Dropdown visible onClickOutside={() => {}}>
        Foo
      </Dropdown>,
    );

    expect(wrapper.is('div')).toBe(true);
    expect(wrapper.prop('children')).toBe('Foo');
  });

  it('can change position and styles with props', () => {
    const wrapper = shallowWithStyles(
      <Dropdown fixed visible left="15px" top={15} zIndex={1} onClickOutside={() => {}}>
        Foo
      </Dropdown>,
    );

    expect(wrapper.is('div')).toBe(true);
    expect(wrapper.prop('children')).toBe('Foo');
  });

  it('sets `onBlur` prop', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(
      <Dropdown visible onBlur={spy} onClickOutside={() => {}}>
        Foo
      </Dropdown>,
    );

    expect(wrapper.prop('onBlur')).toBe(spy);
  });

  it('sets `onFocus` prop', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(
      <Dropdown visible onFocus={spy} onClickOutside={() => {}}>
        Foo
      </Dropdown>,
    );

    expect(wrapper.prop('onFocus')).toBe(spy);
  });

  it('closes when clicked outside', () => {
    const spy = jest.fn();

    const eventMap: {
      click: (() => void) | null;
    } = {
      click: null,
    };

    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event as 'click'] = cb as () => void;
    });

    shallowWithStyles(
      <Dropdown visible onClickOutside={spy}>
        Foo
      </Dropdown>,
    );

    eventMap.click!();

    expect(spy).toHaveBeenCalled();
  });

  describe('componentDidMount', () => {
    it('adds event listener when `visible` is `true`', () => {
      const eventSpy = jest.spyOn(document, 'addEventListener');

      shallowWithStyles(
        <Dropdown visible onClickOutside={() => {}}>
          Foo
        </Dropdown>,
      );

      expect(eventSpy).toHaveBeenCalledWith('click', expect.any(Function), true);

      eventSpy.mockRestore();
    });
  });

  describe('componentDidUpdate', () => {
    it('adds event listener when `visible` changes to `true`', () => {
      const eventSpy = jest.spyOn(document, 'addEventListener');

      const wrapper = shallowWithStyles(<Dropdown onClickOutside={() => {}}>Foo</Dropdown>);

      wrapper.setProps({
        visible: true,
      });

      expect(eventSpy).toHaveBeenCalledWith('click', expect.any(Function), true);

      eventSpy.mockRestore();
    });

    it('removes event listener when `visible` changes to `false`', () => {
      const eventSpy = jest.spyOn(document, 'removeEventListener');

      const wrapper = shallowWithStyles(
        <Dropdown visible onClickOutside={() => {}}>
          Foo
        </Dropdown>,
      );

      wrapper.setProps({
        visible: false,
      });

      expect(eventSpy).toHaveBeenCalledWith('click', expect.any(Function), true);

      eventSpy.mockRestore();
    });
  });

  describe('componentWillUnmount', () => {
    it('removes event listener when `visible` changes to `false`', () => {
      const eventSpy = jest.spyOn(document, 'removeEventListener');

      const wrapper = shallowWithStyles(
        <Dropdown visible onClickOutside={() => {}}>
          Foo
        </Dropdown>,
      );

      // @ts-ignore
      wrapper.instance().componentWillUnmount();

      expect(eventSpy).toHaveBeenCalledWith('click', expect.any(Function), true);

      eventSpy.mockRestore();
    });
  });
});
