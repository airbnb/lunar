import React from 'react';
import { shallow } from 'enzyme';
import ProgressBar from '../../src/components/ProgressBar';

describe('<ProgressBar />', () => {
  it('renders a progress bar', () => {
    const wrapper = shallow(<ProgressBar percent={10} />);

    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('renders trailing', () => {
    const wrapper = shallow(<ProgressBar trailing percent={50} />);

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('className'),
    ).toMatch('bar_leading');
  });

  it('renders leading', () => {
    const wrapper = shallow(<ProgressBar leading percent={50} />);

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('className'),
    ).toMatch('bar_trailing');
  });

  it('renders danger', () => {
    const wrapper = shallow(<ProgressBar danger percent={50} />);

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('className'),
    ).toMatch('bar_danger');
  });

  it('renders muted', () => {
    const wrapper = shallow(<ProgressBar muted percent={50} />);

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('className'),
    ).toMatch('bar_muted');
  });

  it('renders notice', () => {
    const wrapper = shallow(<ProgressBar notice percent={50} />);

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('className'),
    ).toMatch('bar_notice');
  });

  it('renders success', () => {
    const wrapper = shallow(<ProgressBar success percent={50} />);

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('className'),
    ).toMatch('bar_success');
  });

  it('renders warning', () => {
    const wrapper = shallow(<ProgressBar warning percent={50} />);

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('className'),
    ).toMatch('bar_warning');
  });

  it('can change width with percent prop', () => {
    const wrapper = shallow(<ProgressBar percent={15} />);

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
