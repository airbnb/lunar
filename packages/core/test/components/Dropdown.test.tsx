import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../../src/components/Dropdown';

describe('<Dropdown />', () => {
  it('renders a div with style attributes', () => {
    const wrapper = shallow(
      <Dropdown visible onClickOutside={() => {}}>
        Foo
      </Dropdown>,
    );

    expect(wrapper.is('div')).toBe(true);
    expect(wrapper.prop('children')).toBe('Foo');
    expect(wrapper.prop('style')).toEqual({
      position: 'absolute',
      top: '100%',
      left: 0,
      zIndex: 'auto',
    });
  });

  it('can change position', () => {
    const wrapper = shallow(
      <Dropdown fixed visible left="15px" top={15} zIndex={1} onClickOutside={() => {}}>
        Foo
      </Dropdown>,
    );

    expect(wrapper.is('div')).toBe(true);
    expect(wrapper.prop('children')).toBe('Foo');
    expect(wrapper.prop('style')).toEqual({
      position: 'fixed',
      top: 15,
      left: '15px',
      zIndex: 1,
    });
  });

  it('sets `onBlur` prop', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <Dropdown visible onBlur={spy} onClickOutside={() => {}}>
        Foo
      </Dropdown>,
    );

    expect(wrapper.prop('onBlur')).toBe(spy);
  });

  it('sets `onFocus` prop', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <Dropdown visible onFocus={spy} onClickOutside={() => {}}>
        Foo
      </Dropdown>,
    );

    expect(wrapper.prop('onFocus')).toBe(spy);
  });

  it('closes when clicked outside', () => {
    const spy = jest.fn();

    const eventMap = {
      click: null,
    } as any;

    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb;
    });

    shallow(
      <Dropdown visible onClickOutside={spy}>
        Foo
      </Dropdown>,
    );

    eventMap.click();

    expect(spy).toHaveBeenCalled();
  });

  describe('componentDidMount', () => {
    it('adds event listener when `visible` is `true`', () => {
      const eventSpy = jest.spyOn(document, 'addEventListener');

      shallow(
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

      const wrapper = shallow(<Dropdown onClickOutside={() => {}}>Foo</Dropdown>);

      wrapper.setProps({
        visible: true,
      });

      expect(eventSpy).toHaveBeenCalledWith('click', expect.any(Function), true);

      eventSpy.mockRestore();
    });

    it('removes event listener when `visible` changes to `false`', () => {
      const eventSpy = jest.spyOn(document, 'removeEventListener');

      const wrapper = shallow(
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

      const wrapper = shallow(
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
