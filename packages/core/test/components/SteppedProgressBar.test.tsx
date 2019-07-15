import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import SteppedProgressBar, { Step } from '../../src/components/SteppedProgressBar';

describe('<SteppedProgressBar />', () => {
  it('renders steps', () => {
    const wrapper = shallowWithStyles(
      <SteppedProgressBar>
        <Step />
        <Step />
        <Step />
      </SteppedProgressBar>,
    );

    expect(wrapper.find(Step)).toHaveLength(3);
  });

  it('sets first and last', () => {
    const wrapper = shallowWithStyles(
      <SteppedProgressBar>
        <Step />
        <Step />
        <Step />
      </SteppedProgressBar>,
    );
    const steps = wrapper.find(Step);

    expect(steps.at(0).prop('first')).toBe(true);
    expect(steps.at(0).prop('last')).toBe(false);

    expect(steps.at(1).prop('first')).toBe(false);
    expect(steps.at(1).prop('last')).toBe(false);

    expect(steps.at(2).prop('first')).toBe(false);
    expect(steps.at(2).prop('last')).toBe(true);
  });

  it('errors if child is not a `Step`', () => {
    expect(() => {
      shallowWithStyles(<SteppedProgressBar>Foo</SteppedProgressBar>);
    }).toThrowError();
  });
});
