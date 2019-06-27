import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Step from '../../../src/components/SteppedProgressBar/Step';
import ProgressBar from '../../../src/components/ProgressBar';
import Tooltip from '../../../src/components/Tooltip';

describe('<Step />', () => {
  it('renders 0% when not complete', () => {
    const wrapper = shallowWithStyles(<Step />);

    expect(wrapper.find(ProgressBar).prop('percent')).toBe(0);
  });

  it('renders 100% when complete', () => {
    const wrapper = shallowWithStyles(<Step complete />);

    expect(wrapper.find(ProgressBar).prop('percent')).toBe(100);
  });

  it('wraps in a tooltip when label is present', () => {
    const wrapper = shallowWithStyles(<Step complete />);

    expect(wrapper.find(Tooltip)).toHaveLength(0);

    wrapper.setProps({
      label: 'Hello',
    });

    expect(wrapper.find(Tooltip)).toHaveLength(1);
    expect(wrapper.find(Tooltip).prop('content')).toBe('Hello');
  });

  it('sets leading if first', () => {
    const wrapper = shallowWithStyles(<Step first />);

    expect(wrapper.find(ProgressBar).prop('leading')).toBe(true);
  });

  it('sets leading if not first or last', () => {
    const wrapper = shallowWithStyles(<Step />);

    expect(wrapper.find(ProgressBar).prop('leading')).toBe(true);
  });

  it('doesnt set leading if last', () => {
    const wrapper = shallowWithStyles(<Step last />);

    expect(wrapper.find(ProgressBar).prop('leading')).toBe(false);
  });

  it('sets trailing if last', () => {
    const wrapper = shallowWithStyles(<Step last />);

    expect(wrapper.find(ProgressBar).prop('trailing')).toBe(true);
  });

  it('sets trailing if not first or last', () => {
    const wrapper = shallowWithStyles(<Step />);

    expect(wrapper.find(ProgressBar).prop('trailing')).toBe(true);
  });

  it('doesnt set trailing if first', () => {
    const wrapper = shallowWithStyles(<Step first />);

    expect(wrapper.find(ProgressBar).prop('trailing')).toBe(false);
  });
});
