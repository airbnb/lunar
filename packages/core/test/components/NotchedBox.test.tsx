import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import NotchedBox, { Props } from '../../src/components/NotchedBox';

describe('<NotchedBox />', () => {
  let wrapper: Enzyme.ShallowWrapper<Props>;

  beforeEach(() => {
    wrapper = shallow(<NotchedBox>hello world</NotchedBox>);
  });

  it('can have an offet of 0', () => {
    wrapper.setProps({ notchOffset: 0 });
    expect(wrapper).toMatchSnapshot();
  });

  it('can have a negative offet', () => {
    wrapper.setProps({ notchOffset: -100 });
    expect(wrapper).toMatchSnapshot();
  });

  it('can be inverted', () => {
    wrapper.setProps({ inverted: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('can be inline', () => {
    wrapper.setProps({ inline: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('can be below', () => {
    wrapper.setProps({ notchBelow: true });
    expect(wrapper).toMatchSnapshot();
  });
});
