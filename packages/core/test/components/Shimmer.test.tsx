import React from 'react';
import { shallow } from 'enzyme';
import Shimmer from '../../src/components/Shimmer';

describe('<Shimmer />', () => {
  it('renders default', () => {
    const wrapper = shallow(<Shimmer />);

    expect(wrapper.prop('className')).toBe('shimmer');
  });

  it('renders block', () => {
    const wrapper = shallow(<Shimmer block />);

    expect(wrapper.prop('className')).toBe('shimmer shimmer_block');
  });

  it('renders with custom dimensions', () => {
    const wrapper = shallow(<Shimmer width={100} height="1em" />);

    expect(wrapper.prop('style')).toEqual(
      expect.objectContaining({
        width: 100,
        height: '1em',
      }),
    );
  });

  it('renders with custom border radius', () => {
    const wrapper = shallow(<Shimmer radius="50%" />);

    expect(wrapper.prop('style')).toEqual(
      expect.objectContaining({
        borderRadius: '50%',
      }),
    );
  });

  it('doesnt change random width between renders', () => {
    const wrapper = shallow(<Shimmer width="random" />);

    const baseWidth = wrapper.prop('style').width;

    wrapper.update();

    const nextWidth = wrapper.prop('style').width;

    expect(baseWidth).toBe(nextWidth);
  });
});
