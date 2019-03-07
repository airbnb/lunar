import React from 'react';
import { shallow } from 'enzyme';
import Shimmer, { Shimmer as BaseShimmer } from '../../src/components/Shimmer';

describe('<Shimmer />', () => {
  it('renders default', () => {
    const wrapper = shallow(<Shimmer />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders block', () => {
    const wrapper = shallow(<Shimmer block />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with custom dimensions', () => {
    const wrapper = shallow(<Shimmer width={100} height="1em" />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with custom border radius', () => {
    const wrapper = shallow(<Shimmer radius="50%" />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('doesnt change random width between renders', () => {
    const wrapper = shallow(<Shimmer width="random" />).dive();
    const width = (wrapper.instance() as BaseShimmer).randomWidth;

    wrapper.update();

    expect(width).toBe((wrapper.instance() as BaseShimmer).randomWidth);
  });
});
