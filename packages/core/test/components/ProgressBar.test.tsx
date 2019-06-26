import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import ProgressBar from '../../src/components/ProgressBar';

describe('<ProgressBar />', () => {
  it('renders a progress bar', () => {
    const wrapper = shallowWithStyles(<ProgressBar percent={10}>Button</ProgressBar>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders trailing', () => {
    const wrapper = shallowWithStyles(
      <ProgressBar trailing percent={50}>
        Button
      </ProgressBar>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders leading', () => {
    const wrapper = shallowWithStyles(
      <ProgressBar leading percent={50}>
        Button
      </ProgressBar>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('can change width with percent prop', () => {
    const wrapper = shallowWithStyles(<ProgressBar percent={15}>Button</ProgressBar>);

    expect(
      wrapper
        .find('div')
        .at(2)
        .prop('style'),
    ).toEqual({ width: '15%' });

    wrapper.setProps({
      percent: 85,
    });

    expect(
      wrapper
        .find('div')
        .at(2)
        .prop('style'),
    ).toEqual({ width: '85%' });
  });
});
