import React from 'react';
import { shallow } from 'enzyme';
import ProgressBar from '../../src/components/ProgressBar';

describe('<ProgressBar />', () => {
  it('renders a progress bar', () => {
    const wrapper = shallow(<ProgressBar percent={10}>Button</ProgressBar>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders trailing', () => {
    const wrapper = shallow(
      <ProgressBar trailing percent={50}>
        Button
      </ProgressBar>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders leading', () => {
    const wrapper = shallow(
      <ProgressBar leading percent={50}>
        Button
      </ProgressBar>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('can change width with percent prop', () => {
    const wrapper = shallow(<ProgressBar percent={15}>Button</ProgressBar>).dive();

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
