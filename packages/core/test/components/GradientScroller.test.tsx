import React from 'react';
import { shallowWithStyles, mockResizeObserver } from '@airbnb/lunar-test-utils';
import GradientScroller, {
  GradientScroller as BaseGradientScroller,
} from '../../src/components/GradientScroller';

describe('<GradientScroller />', () => {
  let unmockObserver: () => void;

  beforeEach(() => {
    unmockObserver = mockResizeObserver();
  });

  afterEach(() => {
    unmockObserver();
  });

  it('has the correct default sizing', () => {
    const wrapper = shallowWithStyles(<GradientScroller />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders arrows when `showArrows` is true', () => {
    const wrapper = shallowWithStyles(<GradientScroller showArrows />);

    expect(wrapper.find('button')).toHaveLength(2);

    wrapper.setProps({
      showArrows: false,
    });

    expect(wrapper.find('button')).toHaveLength(0);
  });

  it('triggers scroll when left arrow is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(<GradientScroller showArrows />);

    (wrapper.instance() as BaseGradientScroller).doScroll = spy;

    wrapper
      .find('button')
      .at(0)
      .simulate('click', { type: 'click' });

    expect(spy).toHaveBeenCalled();
  });

  it('triggers scroll when right arrow is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(<GradientScroller showArrows />);

    (wrapper.instance() as BaseGradientScroller).doScroll = spy;

    wrapper
      .find('button')
      .at(1)
      .simulate('click', { type: 'click' });

    expect(spy).toHaveBeenCalled();
  });

  describe('calculateAutoScrollIncrement()', () => {
    it('uses prop value', () => {
      const wrapper = shallowWithStyles(<GradientScroller autoScrollIncrement={10} />);

      expect((wrapper.instance() as BaseGradientScroller).calculateAutoScrollIncrement()).toBe(10);
    });

    it('uses ref width', () => {
      const wrapper = shallowWithStyles(<GradientScroller />);
      const instance = wrapper.instance() as BaseGradientScroller;
      const ref = document.createElement('div');

      Object.defineProperty(ref, 'offsetWidth', {
        value: 100,
      });

      instance.scrollerRef = ref;

      expect(instance.calculateAutoScrollIncrement()).toBe(15);
    });

    it('uses fallback constant', () => {
      const wrapper = shallowWithStyles(<GradientScroller />);
      const instance = wrapper.instance() as BaseGradientScroller;

      instance.scrollerRef = null;

      expect(instance.calculateAutoScrollIncrement()).toBe(25);
    });
  });
});
