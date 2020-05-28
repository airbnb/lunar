import React from 'react';
import Enzyme from 'enzyme';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Popover, {
  Popover as BasePopover,
  PopoverProps,
  PopoverState,
} from '../../src/components/Popover';

jest.mock('uuid', () => ({ v4: () => 'uuid-test-mock' }));

describe('<Popover />', () => {
  let wrapper: Enzyme.ShallowWrapper<PopoverProps, PopoverState, BasePopover>;
  let childContainer: Enzyme.ShallowWrapper;

  beforeEach(() => {
    wrapper = shallowWithStyles(
      <Popover content="test">
        <a href="/">hello world</a>
      </Popover>,
    );

    wrapper.setState({ targetRectReady: true });
    childContainer = wrapper.find('div[aria-labelledby]');
  });

  it('opens up when hovered', () => {
    childContainer.simulate('mouseenter');
    expect(wrapper.state('open')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it('fires onShow callback when hovered', () => {
    const onShowSpy = jest.fn();
    wrapper.setProps({ onShow: onShowSpy });
    childContainer.simulate('mouseenter');
    expect(onShowSpy).toHaveBeenCalled();
  });

  it('can underline', () => {
    wrapper.setProps({ underlined: true });
    expect(wrapper).toMatchSnapshot();
  });

  describe('mouseEnterDelay', () => {
    beforeEach(() => {
      wrapper.setProps({ mouseEnterDelay: 1 });
    });

    it('does not open up when hovered for shorter than mouseEnterDelay', () => {
      childContainer.simulate('mouseenter');
      expect(wrapper.state('open')).not.toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });

    it('opens up when hovered for mouseEnterDelay seconds', () => {
      jest.useFakeTimers();

      childContainer.simulate('mouseenter');
      setTimeout(() => {
        expect(wrapper.state('open')).toBeTruthy();
      }, 1000);

      jest.runAllTimers();
    });
  });

  describe('mouseLeaveDelay', () => {
    beforeEach(() => {
      wrapper.setState({ open: true });
      wrapper.setProps({ mouseLeaveDelay: 1 });
    });

    it('does not yet close when the mouse has left for shorter than mouseLeaveDelay seconds', () => {
      childContainer.simulate('mouseleave');
      expect(wrapper.state('open')).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });

    it('closes after leaving for mouseLeaveDelay seconds', () => {
      jest.useFakeTimers();

      childContainer.simulate('mouseleave');
      setTimeout(() => {
        expect(wrapper.state('open')).not.toBeTruthy();
      }, 1000);

      jest.runAllTimers();
    });
  });

  describe('disabled', () => {
    beforeEach(() => {
      wrapper.setProps({ disabled: true });
    });

    it('does not up when hovered', () => {
      childContainer.simulate('mouseenter');
      expect(wrapper.state('open')).not.toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });

    it('does not underline', () => {
      wrapper.setProps({ underlined: true });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('once open', () => {
    beforeEach(() => {
      wrapper.setState({ open: true });
    });

    it('closes when child exited', () => {
      jest.useFakeTimers();

      // Popover is programmed with a 100ms lag between mouseleave and close
      childContainer.simulate('mouseleave');
      setTimeout(() => {
        expect(wrapper.state('open')).not.toBeTruthy();
      }, 100);
      jest.runAllTimers();
    });

    it('closes when child mousedowned', () => {
      childContainer.simulate('mousedown');
      expect(wrapper.state('open')).not.toBeTruthy();
    });

    it('supports changing content', () => {
      wrapper.setProps({ content: 'whatever' });
      expect(wrapper.state('open')).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });

    describe('with remainOnMouseDown', () => {
      beforeEach(() => {
        wrapper.setProps({ remainOnMouseDown: true });
      });

      it('does not close when child mousedowned', () => {
        childContainer.simulate('mousedown');
        expect(wrapper.state('open')).toBeTruthy();
      });
    });

    it('unmounts cleanly', () => {
      const instance = wrapper.instance() as BasePopover;
      wrapper.unmount();

      expect(instance.rafHandle).not.toBeTruthy();
    });
  });
});
