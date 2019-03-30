import React from 'react';
import { shallow, mount } from 'enzyme';
import Interval from '../../src/components/Interval';

describe('<Interval />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('immedietly renders the function child', () => {
    const children = jest.fn().mockReturnValue('test');
    shallow(<Interval every={1000}>{children}</Interval>);
    expect(children).toHaveBeenCalledTimes(1);
  });

  it('calls the function child roughly at the provided interval', () => {
    const spy = jest.spyOn(window, 'setTimeout');

    shallow(<Interval every={1000}>{() => 'Child'}</Interval>);

    expect(spy).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(2000);

    expect(spy).toHaveBeenCalledTimes(3);

    spy.mockRestore();
  });

  it('calls the function child with a timestamp', () => {
    const children = jest.fn().mockReturnValue('test');
    shallow(<Interval every={1000}>{children}</Interval>);
    expect(children).toHaveBeenCalledWith(expect.any(Number));
  });

  it('correctly unmounts', () => {
    const children = jest.fn().mockReturnValue('test');
    const wrapper = mount(<Interval every={1000}>{children}</Interval>);
    expect(children).toHaveBeenCalledTimes(1);
    wrapper.unmount();
    jest.advanceTimersByTime(1100);
    expect(children).toHaveBeenCalledTimes(1);
  });
});
