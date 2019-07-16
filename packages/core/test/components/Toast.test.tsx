import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Toast, { Toast as BaseToast } from '../../src/components/Toast';
import IconButton from '../../src/components/IconButton';
import Button from '../../src/components/Button';
import Text from '../../src/components/Text';
import crosstab from '../../src/crosstab';

describe('<Toast />', () => {
  it('sets failed class', () => {
    const wrapper = shallowWithStyles(<Toast id="1" message="Hi" danger />);

    expect(wrapper.prop('className')).toMatch('container_danger');
  });

  it('sets failed class if an `Error`', () => {
    const wrapper = shallowWithStyles(<Toast id="1" message={new Error('Hi')} />);

    expect(wrapper.prop('className')).toMatch('container_danger');
  });

  it('sets success class', () => {
    const wrapper = shallowWithStyles(<Toast id="1" message="Hi" success />);

    expect(wrapper.prop('className')).toMatch('container_success');
  });

  it('renders message', () => {
    const wrapper = shallowWithStyles(<Toast id="1" message="Hi" />);

    expect(wrapper.find(Text).prop('children')).toBe('Hi');
  });

  it('renders error', () => {
    const wrapper = shallowWithStyles(<Toast id="1" message={new Error('Error')} />);

    expect(wrapper.prop('className')).toMatch('container_danger');
  });

  it('renders refresh', () => {
    const wrapper = shallowWithStyles(
      <Toast id="1" message="A new version is available" refresh />,
    );

    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('shows the toast', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(<Toast id="1" message="Hi" onOpen={spy} />);

    expect(wrapper.state('visible')).toBe(false);

    (wrapper.instance() as BaseToast).showToast();

    expect(wrapper.state('visible')).toBe(true);
    expect(spy).toHaveBeenCalled();
  });

  it('emits crosstab events when crostTabClose is set to true', () => {
    const wrapper = shallowWithStyles(
      <Toast id="1" message="Hi" delay={25} duration={50} crosstabClose />,
    );
    const crosstabHandler = jest.fn();

    wrapper.instance().componentDidMount!();

    crosstab.on('toast:crosstabClose:1', crosstabHandler);

    wrapper.find(IconButton).simulate('click');

    expect(crosstabHandler).toHaveBeenCalledTimes(1);
  });

  it('does not emit crosstab events when crostTabClose is set to false', () => {
    const wrapper = shallowWithStyles(<Toast id="1" message="Hi" delay={25} duration={50} />);
    const crosstabHandler = jest.fn();

    wrapper.instance().componentDidMount!();

    crosstab.on('toast:crosstabClose:1', crosstabHandler);

    wrapper.find(IconButton).simulate('click');

    expect(crosstabHandler).not.toHaveBeenCalled();
  });

  describe('timers', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('closes the toast', () => {
      const spyClose = jest.fn();
      const spyRemove = jest.fn();
      const wrapper = shallowWithStyles(
        <Toast id="123" message="Hi" onClose={spyClose} onRemove={spyRemove} />,
      );

      wrapper.setState({
        visible: true,
      });

      wrapper.find(IconButton).simulate('click');

      jest.advanceTimersByTime(150);

      expect(wrapper.state('visible')).toBe(false);
      expect(spyClose).toHaveBeenCalled();
      expect(spyRemove).toHaveBeenCalledWith('123');
    });

    it('triggers `onOpen`, `onClose`, `onRemove` through the timer cycle', () => {
      const open = jest.fn();
      const close = jest.fn();
      const remove = jest.fn();
      const wrapper = shallowWithStyles(
        <Toast
          id="1"
          message="Hi"
          onOpen={open}
          onClose={close}
          onRemove={remove}
          delay={25}
          duration={50}
        />,
      );

      wrapper.instance().componentDidMount!();

      jest.advanceTimersByTime(25);
      expect(open).toHaveBeenCalled();

      // There's 150ms in the transition
      jest.advanceTimersByTime(50 + 150);
      expect(close).toHaveBeenCalled();
      expect(remove).toHaveBeenCalled();
    });

    it('shows toast after delay', () => {
      const wrapper = shallowWithStyles(<Toast id="1" message="Hi" delay={25} duration={0} />);

      wrapper.instance().componentDidMount!();

      expect(wrapper.state('visible')).toBe(false);

      jest.advanceTimersByTime(30);

      expect(wrapper.state('visible')).toBe(true);
    });

    it('hides toast after delay + duration', () => {
      const wrapper = shallowWithStyles(<Toast id="1" message="Hi" delay={25} duration={50} />);

      wrapper.instance().componentDidMount!();

      expect(wrapper.state('visible')).toBe(false);

      jest.advanceTimersByTime(25);
      expect(wrapper.state('visible')).toBe(true);

      jest.advanceTimersByTime(150);

      expect(wrapper.state('visible')).toBe(false);
    });

    it('closes toast when crosstab event is emitted', () => {
      const onRemove = jest.fn();
      const onClose = jest.fn();
      const wrapper = shallowWithStyles(
        <Toast
          id="1"
          message="Hi"
          onClose={onClose}
          onRemove={onRemove}
          delay={25}
          crosstabClose
        />,
      );

      wrapper.instance().componentDidMount!();
      jest.advanceTimersByTime(25);

      crosstab.emit('toast:crosstabClose:1');
      jest.advanceTimersByTime(150);

      expect(wrapper.state('visible')).toBe(false);
      expect(onClose).toHaveBeenCalled();
      expect(onRemove).toHaveBeenCalled();
    });

    it('does not close toast when crosstab event is emitted and crosstabClose is false', () => {
      const onRemove = jest.fn();
      const onClose = jest.fn();
      const wrapper = shallowWithStyles(
        <Toast id="1" message="Hi" onClose={onClose} onRemove={onRemove} delay={25} />,
      );

      wrapper.instance().componentDidMount!();

      crosstab.emit('toast:crosstabClose:1');
      jest.advanceTimersByTime(150);

      expect(wrapper.state('visible')).toBe(true);
      expect(onClose).not.toHaveBeenCalled();
      expect(onRemove).not.toHaveBeenCalled();
    });
  });
});
