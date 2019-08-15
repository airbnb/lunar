import React from 'react';
import { shallow } from 'enzyme';
import copy from 'copy-to-clipboard';
import IconCopy from '@airbnb/lunar-icons/lib/interface/IconCopy';
import Copy from '../../src/components/Copy';
import Link from '../../src/components/Link';

jest.mock('copy-to-clipboard', () => jest.fn(() => true));

describe('<Copy />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders an icon and link by default', () => {
    const wrapper = shallow(<Copy text="foo" />);

    expect(wrapper.find(IconCopy)).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it('can add an id and trackingName to the Link', () => {
    const wrapper = shallow(<Copy text="foo" id="tracking-id" trackingName="tracking-name" />);

    expect(wrapper.find(Link).prop('id')).toBe('tracking-id');
    expect(wrapper.find(Link).prop('trackingName')).toBe('tracking-name');
  });

  it('can customize the child', () => {
    const child = <button type="button">Click</button>;
    const wrapper = shallow(<Copy text="foo">{child}</Copy>);

    expect(wrapper.find(IconCopy)).toHaveLength(0);
    expect(wrapper.find(Link)).toHaveLength(0);
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('copies the text when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<Copy text="foo" onCopy={spy} />);

    wrapper.find(Link).simulate('click', {
      preventDefault() {},
    });

    expect(spy).toHaveBeenCalledWith('foo', true);
    expect(copy).toHaveBeenCalledWith('foo');
  });

  it('toggles copied state', () => {
    const wrapper = shallow(<Copy text="foo" />);

    wrapper.find(Link).simulate('click', {
      preventDefault() {},
    });

    expect(wrapper.state('copied')).toBe(true);

    wrapper.find(Link).simulate('mouseLeave');

    jest.advanceTimersByTime(600);

    expect(wrapper.state('copied')).toBe(false);
  });
});
