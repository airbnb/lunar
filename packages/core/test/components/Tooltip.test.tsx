import React from 'react';
import Enzyme from 'enzyme';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Tooltip, {
  Tooltip as BaseTooltip,
  TooltipProps,
  TooltipState,
} from '../../src/components/Tooltip';

jest.mock('uuid', () => ({ v4: () => 'uuid-test-mock' }));

describe('<Tooltip />', () => {
  let wrapper: Enzyme.ShallowWrapper<TooltipProps, TooltipState, BaseTooltip>;
  let childContainer: Enzyme.ShallowWrapper;

  beforeEach(() => {
    wrapper = shallowWithStyles(
      <Tooltip content="test">
        <a href="/">hello world</a>
      </Tooltip>,
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
      childContainer.simulate('mouseleave');
      expect(wrapper.state('open')).not.toBeTruthy();
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

    it('fires onClose callback when closed', () => {
      const onCloseSpy = jest.fn();
      wrapper.setProps({ onClose: onCloseSpy });
      childContainer.simulate('mouseleave');
      expect(onCloseSpy).toHaveBeenCalled();
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
  });

  describe('popover', () => {
    beforeEach(() => {
      wrapper.setProps({ popover: true });
      wrapper.setState({ open: true });
    });

    it('does not yet close when the mouse left the popup for fewer than 100ms', () => {
      jest.useFakeTimers();

      childContainer.simulate('mouseleave');
      // Popover is programmed with a 100ms lag between mouseleave and close
      // so this shouldn't be closed yet
      setTimeout(() => {
        expect(wrapper.state('open')).toBeTruthy();
      }, 99);
      jest.runAllTimers();
    });

    it('closes when child exited for 100ms', () => {
      jest.useFakeTimers();

      childContainer.simulate('mouseleave');
      // Popover is programmed with a 100ms lag between mouseleave and close
      setTimeout(() => {
        expect(wrapper.state('open')).not.toBeTruthy();
      }, 100);
      jest.runAllTimers();
    });

    it('closes when child mousedowned', () => {
      childContainer.simulate('mousedown');
      expect(wrapper.state('open')).not.toBeTruthy();
    });
  });

  it('unmounts cleanly', () => {
    const instance = wrapper.instance() as BaseTooltip;
    wrapper.unmount();

    expect(instance.rafHandle).not.toBeTruthy();
  });
});
