import React from 'react';
import Enzyme from 'enzyme';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import ScrollWrapper, {
  ScrollWrapper as BaseScrollWrapper,
  Props,
} from '../../../src/components/ScrollSection/ScrollWrapper';

describe('<ScrollWrapper />', () => {
  const anchor = document.createElement('a');
  const savedIntersectionObserver = global.IntersectionObserver;
  let wrapper: Enzyme.ShallowWrapper<Props, unknown, BaseScrollWrapper>;
  let activeScrollSectionHandler: jest.Mock<unknown>;
  let hideScrollSectionHandler: jest.Mock<unknown>;

  beforeEach(() => {
    activeScrollSectionHandler = jest.fn();
    hideScrollSectionHandler = jest.fn();
    wrapper = shallowWithStyles(
      <ScrollWrapper
        onChangeActiveScrollSection={activeScrollSectionHandler}
        onHideScrollSection={hideScrollSectionHandler}
      >
        <footer>Footer Text</footer>
      </ScrollWrapper>,
    );

    wrapper.instance().scrollRef = { current: document.createElement('div') };
    wrapper.instance().setupObserver();
  });

  beforeAll(() => {
    // @ts-ignore Allow mock
    global.IntersectionObserver = class IntersectionObserver {
      constructor(callback: Function) {
        this.callback = callback;
      }

      callback: Function;

      root = null;

      rootMargin = '';

      thresholds = [];

      disconnect = jest.fn();

      observe = jest.fn();

      unobserve = jest.fn();

      takeRecords = jest.fn();
    };
  });

  afterAll(() => {
    global.IntersectionObserver = savedIntersectionObserver;
  });

  it('renders children', () => {
    expect(wrapper.find('footer')).toHaveLength(1);
  });

  it('sets up observer on ref', () => {
    expect(wrapper.instance().observer).not.toBeNull();
  });

  it('destructs observer on null ref', () => {
    const { observer } = wrapper.instance();

    // @ts-ignore Allow read-only change
    wrapper.instance().scrollRef.current = null;
    wrapper.instance().setupObserver();

    expect(observer!.disconnect).toHaveBeenCalled();
    expect(wrapper.instance().observer).toBeNull();
  });

  it('calls the change and hide callbacks as expected', () => {
    const { observer } = wrapper.instance();

    // @ts-ignore
    observer.callback([
      { isIntersecting: true, target: { id: 1 } },
      { isIntersecting: false, target: { id: 2 } },
    ]);

    expect(activeScrollSectionHandler).toHaveBeenCalledWith(1);
    expect(hideScrollSectionHandler).toHaveBeenCalledWith(2);
  });

  it('addScrollAnchor adds anchor to anchors', () => {
    wrapper.instance().addScrollAnchor('name', anchor);

    expect(wrapper.instance().anchors.get('name')).toBe(anchor);
  });

  it('addScrollAnchor errors if anchor already added', () => {
    expect(() => {
      wrapper.instance().addScrollAnchor('name', anchor);
      wrapper.instance().addScrollAnchor('name', anchor);
    }).toThrowError('Duplicate anchor id added: name');
  });

  it('observes new anchors', () => {
    wrapper.instance().addScrollAnchor('name', anchor);

    expect(wrapper.instance().observer!.observe).toHaveBeenCalledWith(anchor);
  });

  it('observes existing anchors when ref changes', () => {
    wrapper.instance().addScrollAnchor('name', anchor);
    wrapper.instance().setupObserver();

    expect(wrapper.instance().observer!.observe).toHaveBeenCalledWith(anchor);
  });

  it('creates new observer when margin changes', () => {
    const { observer } = wrapper.instance();

    wrapper.setProps({
      intersectionMargin: '123',
    });

    expect(observer).not.toBe(wrapper.instance().observer);
  });

  it('removeScrollAnchor removes given anchor from anchors', () => {
    wrapper.instance().addScrollAnchor('name', anchor);
    wrapper.instance().removeScrollAnchor('name');

    expect(wrapper.instance().anchors.get('name')).not.toBeDefined();
  });

  it('removeScrollAnchor does not call unobserve if anchor has not been added', () => {
    wrapper.instance().removeScrollAnchor('name');

    expect(wrapper.instance().observer!.unobserve).not.toHaveBeenCalled();
  });

  it('removeScrollAnchor removes observer from deleted anchor', () => {
    wrapper.instance().addScrollAnchor('name', anchor);
    wrapper.instance().removeScrollAnchor('name');

    expect(wrapper.instance().observer!.unobserve).toHaveBeenCalledWith(anchor);
  });
});
