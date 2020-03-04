import React from 'react';
import { mountUseStyles } from '@airbnb/lunar-test-utils';
import CountBadge from '../../src/components/CountBadge';

describe('<CountBadge />', () => {
  const props = {
    accessibilityLabel: '5 unread messages',
    value: 5,
  };

  it('renders default', () => {
    const wrapper = mountUseStyles(<CountBadge {...props} />);

    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('does not render when value is 0', () => {
    const wrapper = mountUseStyles(<CountBadge {...props} value={0} />);

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('handles waggle class based on interval setting', () => {
    const wrapper = mountUseStyles(<CountBadge {...props} />);
    const oldClass = wrapper.find('div').prop('className');

    wrapper.setProps({
      waggle: true,
    });

    expect(wrapper.find('div').prop('className')).not.toBe(oldClass);
  });

  it('adds animation when value is changed', () => {
    const wrapper = mountUseStyles(<CountBadge {...props} waggle />);
    const div = wrapper.find('div').getDOMNode() as HTMLDivElement;

    // eslint-disable-next-line jest/prefer-spy-on
    div.animate = jest.fn();

    wrapper.setProps({ value: 10 });

    expect(div.animate).toHaveBeenCalledTimes(1);
    expect(div.animate).toHaveBeenCalledWith(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.1)', offset: 0.3 },
        { transform: 'scale(.95)', offset: 0.8 },
        { transform: 'scale(1)' },
      ],
      300,
    );

    wrapper.setProps({ value: 0 });
    expect(div.animate).toHaveBeenCalledTimes(1);
  });
});
