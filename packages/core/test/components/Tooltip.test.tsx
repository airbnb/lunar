import React from 'react';
import Enzyme from 'enzyme';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Tooltip, { Tooltip as BaseTooltip, Props, State } from '../../src/components/Tooltip';

// eslint-disable-next-line unicorn/consistent-function-scoping
jest.mock('uuid/v4', () => () => 'uuid-test-mock');

describe('<Tooltip />', () => {
  let wrapper: Enzyme.ShallowWrapper<Props, State, BaseTooltip>;
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

  it('unmounts cleanly', () => {
    const instance = wrapper.instance() as BaseTooltip;
    wrapper.unmount();

    expect(instance.rafHandle).not.toBeTruthy();
  });
});
