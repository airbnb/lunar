import React from 'react';
import { shallow } from 'enzyme';
import Toast, { Toast as BaseToast } from '../../src/components/Toast';
import IconButton from '../../src/components/IconButton';

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

  it('closes the toast', () => {
    const spyClose = jest.fn();
    const spyRemove = jest.fn();
    const wrapper = shallow(
      <Toast id="123" message="Hi" onClose={spyClose} onRemove={spyRemove} />,
    ).dive();

    wrapper.setState({
      visible: true,
    });

    jest.useFakeTimers();

    wrapper.find(IconButton).simulate('click');

    jest.runAllTimers();
    jest.useRealTimers();

    expect(wrapper.state('visible')).toBe(false);
    expect(spyClose).toHaveBeenCalled();
    expect(spyRemove).toHaveBeenCalledWith('123');
  });

  describe('timers', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
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
          duration={25}
        />,
      ).shallow();

      wrapper.instance().componentDidMount!();

      setTimeout(() => {
        expect(open).toHaveBeenCalled();
      }, 25);

      // There's 150ms in the transition
      setTimeout(() => {
        expect(close).toHaveBeenCalled();
        expect(remove).toHaveBeenCalled();
      }, 25 + 150);
    });

    it('shows toast after delay', () => {
      const wrapper = shallow(<Toast id="1" message="Hi" delay={25} duration={0} />).dive();

      wrapper.instance().componentDidMount!();

      expect(wrapper.state('visible')).toBe(false);

      setTimeout(() => {
        expect(wrapper.state('visible')).toBe(true);
      }, 30);
    });

    it('hides toast after delay + duration', () => {
      const wrapper = shallow(<Toast id="1" message="Hi" delay={25} duration={50} />).dive();

      wrapper.instance().componentDidMount!();

      expect(wrapper.state('visible')).toBe(false);

      setTimeout(() => {
        expect(wrapper.state('visible')).toBe(true);
      }, 25);

      setTimeout(() => {
        expect(wrapper.state('visible')).toBe(false);
      }, 50);
    });
  });
});
