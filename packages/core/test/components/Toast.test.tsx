import React from 'react';
import { shallow } from 'enzyme';
import Toast, { Toast as BaseToast } from '../../src/components/Toast';
import IconButton from '../../src/components/IconButton';
import crosstab from '../../src/crosstab';

describe('<Toast />', () => {
  it('sets failed class', () => {
    const wrapper = shallow(<Toast id="1" message="Hi" danger />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('sets failed class if an `Error`', () => {
    const wrapper = shallow(<Toast id="1" message={new Error('Hi')} />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('sets success class', () => {
    const wrapper = shallow(<Toast id="1" message="Hi" success />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders message', () => {
    const wrapper = shallow(<Toast id="1" message="Hi" />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders error', () => {
    const wrapper = shallow(<Toast id="1" message={new Error('Error')} />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders refresh', () => {
    const wrapper = shallow(<Toast id="1" message="A new version is available" refresh />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('shows the toast', () => {
    const spy = jest.fn();
    const wrapper = shallow(<Toast id="1" message="Hi" onOpen={spy} />).dive();

    expect(wrapper.state('visible')).toBe(false);

    (wrapper.instance() as BaseToast).showToast();

    expect(wrapper.state('visible')).toBe(true);
    expect(spy).toHaveBeenCalled();
  });

  it('emits crosstab events when crostTabClose is set to true', () => {
    const wrapper = shallow(
      <Toast id="1" message="Hi" delay={25} duration={50} crosstabClose />,
    ).dive();
    const crosstabHandler = jest.fn();

    wrapper.instance().componentDidMount!();

    crosstab.on('toast:crosstabClose:1', crosstabHandler);

    wrapper.find(IconButton).simulate('click');

    expect(crosstabHandler).toHaveBeenCalledTimes(1);
  });

  it('does not emit crosstab events when crostTabClose is set to false', () => {
    const wrapper = shallow(<Toast id="1" message="Hi" delay={25} duration={50} />).dive();
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
      const wrapper = shallow(
        <Toast id="123" message="Hi" onClose={spyClose} onRemove={spyRemove} />,
      ).dive();

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
      const wrapper = shallow(
        <Toast
          id="1"
          message="Hi"
          onOpen={open}
          onClose={close}
          onRemove={remove}
          delay={25}
          duration={50}
        />,
      ).shallow();

      wrapper.instance().componentDidMount!();

      jest.advanceTimersByTime(25);
      expect(open).toHaveBeenCalled();

      // There's 150ms in the transition
      jest.advanceTimersByTime(50 + 150);
      expect(close).toHaveBeenCalled();
      expect(remove).toHaveBeenCalled();
    });

    it('shows toast after delay', () => {
      const wrapper = shallow(<Toast id="1" message="Hi" delay={25} duration={0} />).dive();

      wrapper.instance().componentDidMount!();

      expect(wrapper.state('visible')).toBe(false);

      jest.advanceTimersByTime(30);

      expect(wrapper.state('visible')).toBe(true);
    });

    it('hides toast after delay + duration', () => {
      const wrapper = shallow(<Toast id="1" message="Hi" delay={25} duration={50} />).dive();

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
      const wrapper = shallow(
        <Toast
          id="1"
          message="Hi"
          onClose={onClose}
          onRemove={onRemove}
          delay={25}
          crosstabClose
        />,
      ).dive();

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
      const wrapper = shallow(
        <Toast id="1" message="Hi" onClose={onClose} onRemove={onRemove} delay={25} />,
      ).dive();

      wrapper.instance().componentDidMount!();

      crosstab.emit('toast:crosstabClose:1');
      jest.advanceTimersByTime(150);

      expect(wrapper.state('visible')).toBe(true);
      expect(onClose).not.toHaveBeenCalled();
      expect(onRemove).not.toHaveBeenCalled();
    });
  });
});
