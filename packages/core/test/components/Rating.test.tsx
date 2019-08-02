import React from 'react';
import { shallow } from 'enzyme';
import IconStar from '@airbnb/lunar-icons/lib/interface/IconStar';
import IconStarFull from '@airbnb/lunar-icons/lib/interface/IconStarFull';
import IconStarHalf from '@airbnb/lunar-icons/lib/interface/IconStarHalf';
import Rating from '../../src/components/Rating';
import Row from '../../src/components/Row';
import Text from '../../src/components/Text';

describe('<Rating />', () => {
  it('renders default', () => {
    const wrapper = shallow(<Rating rating={0} />);

    expect(wrapper.find(Text).prop('micro')).toBeFalsy();
    expect(wrapper.find(Text).prop('small')).toBeFalsy();
    expect(wrapper.find(Text).prop('large')).toBeFalsy();
  });

  it('renders micro', () => {
    const wrapper = shallow(<Rating micro rating={0} />);

    expect(wrapper.find(Text).prop('micro')).toBeTruthy();
  });

  it('renders small', () => {
    const wrapper = shallow(<Rating small rating={0} />);

    expect(wrapper.find(Text).prop('small')).toBeTruthy();
  });

  it('renders large', () => {
    const wrapper = shallow(<Rating large rating={0} />);

    expect(wrapper.find(Text).prop('large')).toBeTruthy();
  });

  it('renders reviews', () => {
    const wrapper = shallow(<Rating reviews="100" />);

    expect(wrapper.find(Row).prop('after')).toBe('100');
  });

  it('renders all empty stars for a rating of 0', () => {
    const wrapper = shallow(<Rating rating={0} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(0);
    expect(wrapper.find(IconStarHalf)).toHaveLength(0);
    expect(wrapper.find(IconStar)).toHaveLength(5);
  });

  it('renders expected stars for a rating between 0 and 1', () => {
    const wrapper = shallow(<Rating rating={0.5} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(0);
    expect(wrapper.find(IconStarHalf)).toHaveLength(1);
    expect(wrapper.find(IconStar)).toHaveLength(4);
  });

  it('renders expected stars for a rating of 1', () => {
    const wrapper = shallow(<Rating rating={1} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(1);
    expect(wrapper.find(IconStarHalf)).toHaveLength(0);
    expect(wrapper.find(IconStar)).toHaveLength(4);
  });

  it('renders expected stars for a rating between 1 and 2', () => {
    const wrapper = shallow(<Rating rating={1.5} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(1);
    expect(wrapper.find(IconStarHalf)).toHaveLength(1);
    expect(wrapper.find(IconStar)).toHaveLength(3);
  });

  it('renders expected stars for a rating of 2', () => {
    const wrapper = shallow(<Rating rating={2} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(2);
    expect(wrapper.find(IconStarHalf)).toHaveLength(0);
    expect(wrapper.find(IconStar)).toHaveLength(3);
  });

  it('renders expected stars for a rating between 2 and 3', () => {
    const wrapper = shallow(<Rating rating={2.5} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(2);
    expect(wrapper.find(IconStarHalf)).toHaveLength(1);
    expect(wrapper.find(IconStar)).toHaveLength(2);
  });

  it('renders expected stars for a rating of 3', () => {
    const wrapper = shallow(<Rating rating={3} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(3);
    expect(wrapper.find(IconStarHalf)).toHaveLength(0);
    expect(wrapper.find(IconStar)).toHaveLength(2);
  });

  it('renders expected stars for a rating between 3 and 4', () => {
    const wrapper = shallow(<Rating rating={3.5} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(3);
    expect(wrapper.find(IconStarHalf)).toHaveLength(1);
    expect(wrapper.find(IconStar)).toHaveLength(1);
  });

  it('renders expected stars for a rating of 4', () => {
    const wrapper = shallow(<Rating rating={4} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(4);
    expect(wrapper.find(IconStarHalf)).toHaveLength(0);
    expect(wrapper.find(IconStar)).toHaveLength(1);
  });

  it('renders expected stars for a rating between 4 and 5', () => {
    const wrapper = shallow(<Rating rating={4.5} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(4);
    expect(wrapper.find(IconStarHalf)).toHaveLength(1);
    expect(wrapper.find(IconStar)).toHaveLength(0);
  });

  it('renders expected stars for a rating of 5', () => {
    const wrapper = shallow(<Rating rating={5} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(5);
    expect(wrapper.find(IconStarHalf)).toHaveLength(0);
    expect(wrapper.find(IconStar)).toHaveLength(0);
  });
});
