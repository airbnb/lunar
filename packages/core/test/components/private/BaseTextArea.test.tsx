/* eslint-disable no-underscore-dangle */
import React from 'react';
import { shallow } from 'enzyme';
import BaseTextArea from '../../../src/components/private/BaseTextArea';
import FormInput from '../../../src/components/private/FormInput';

describe('<BaseTextArea />', () => {
  it('renders an input with the correct field', () => {
    const wrapper = shallow(<BaseTextArea name="foo" onChange={() => {}} />);

    expect(wrapper.is(FormInput)).toBe(true);
    expect(wrapper.prop('tagName')).toBe('textarea');
  });

  it('reflows on mount', () => {
    const spy = jest.fn();
    const wrapper = shallow<BaseTextArea>(<BaseTextArea name="foo" onChange={() => {}} />);

    wrapper.instance().reflowTextarea = spy;
    wrapper.instance().componentDidMount();

    expect(spy).toHaveBeenCalled();
  });

  it('reflows when value changes', () => {
    const spy = jest.fn();
    const wrapper = shallow<BaseTextArea>(<BaseTextArea name="foo" onChange={() => {}} />);

    wrapper.instance().reflowTextarea = spy;

    wrapper.setProps({
      value: 'new',
    });

    expect(spy).toHaveBeenCalled();
  });

  it('cancels reflow on unmount', () => {
    const spy = jest.spyOn(window, 'cancelAnimationFrame');
    const wrapper = shallow<BaseTextArea>(<BaseTextArea name="foo" onChange={() => {}} />);

    wrapper.instance().reflowRaf = 123;
    wrapper.instance().componentWillUnmount();

    expect(spy).toHaveBeenCalledWith(123);

    spy.mockRestore();
  });

  it('triggers `onChange` handler', () => {
    const spy = jest.fn();
    const wrapper = shallow(<BaseTextArea name="foo" onChange={spy} />);
    const event = {
      currentTarget: {
        value: 'foo',
      },
    };

    wrapper.find(FormInput).simulate('change', event);

    expect(spy).toHaveBeenCalledWith('foo', event);
  });

  describe('reflowTextarea()', () => {
    let ref: HTMLTextAreaElement;

    beforeEach(() => {
      ref = document.createElement('textarea');
    });

    it('does nothing if not autoresize', () => {
      const wrapper = shallow<BaseTextArea>(<BaseTextArea name="foo" onChange={() => {}} />);

      wrapper.instance().textareaRef = ref;
      wrapper.instance().reflowTextarea();

      // @ts-ignore JSDOM specific
      expect(ref.style._values).toEqual({});
    });

    it('sets min and normal height', () => {
      const wrapper = shallow<BaseTextArea>(
        <BaseTextArea name="foo" onChange={() => {}} autoResize />,
      );

      wrapper.instance().textareaRef = ref;
      wrapper.instance().reflowTextarea();

      // @ts-ignore JSDOM specific
      expect(ref.style._values).toEqual({
        height: 'auto',
        'min-height': '125px',
      });
    });

    it('uses manual height if greater than max height', () => {
      const wrapper = shallow<BaseTextArea>(
        <BaseTextArea name="foo" onChange={() => {}} autoResize maxHeight={300} />,
      );

      ref.style.height = '350px';

      wrapper.instance().textareaRef = ref;
      wrapper.instance().reflowTextarea();

      // @ts-ignore JSDOM specific
      expect(ref.style._values).toEqual({
        height: '350px',
        'min-height': '125px',
      });
    });

    it('uses auto if max height is greater than manual height', () => {
      const wrapper = shallow<BaseTextArea>(
        <BaseTextArea name="foo" onChange={() => {}} autoResize maxHeight={300} />,
      );

      ref.style.height = '250px';

      wrapper.instance().textareaRef = ref;
      wrapper.instance().reflowTextarea();

      // @ts-ignore JSDOM specific
      expect(ref.style._values).toEqual({
        height: 'auto',
        'min-height': '125px',
      });
    });
  });

  describe('loadRef()', () => {
    it('reflows when ref is set', () => {
      const spy = jest.fn();
      const wrapper = shallow<BaseTextArea>(<BaseTextArea name="foo" onChange={() => {}} />);

      wrapper.instance().reflowTextarea = spy;

      // @ts-ignore Allow private access
      wrapper.instance().loadRef(document.createElement('textarea'));

      expect(spy).toHaveBeenCalled();
    });

    it('doesnt reflows when ref is null', () => {
      const spy = jest.fn();
      const wrapper = shallow<BaseTextArea>(<BaseTextArea name="foo" onChange={() => {}} />);

      wrapper.instance().reflowTextarea = spy;

      // @ts-ignore Allow private access
      wrapper.instance().loadRef(null);

      expect(spy).not.toHaveBeenCalled();
    });

    it('passes to `propagateRef`', () => {
      const spy = jest.fn();
      const wrapper = shallow<BaseTextArea>(
        <BaseTextArea name="foo" onChange={() => {}} propagateRef={spy} />,
      );

      // @ts-ignore Allow private access
      wrapper.instance().loadRef(null);

      expect(spy).toHaveBeenCalledWith(null);
    });
  });
});
