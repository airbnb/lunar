import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import IconStar from '@airbnb/lunar-icons/lib/interface/IconStar';
import IconStarFull from '@airbnb/lunar-icons/lib/interface/IconStarFull';
import IconStarHalf from '@airbnb/lunar-icons/lib/interface/IconStarHalf';
import Rating from '../../src/components/Rating';
import Spacing from '../../src/components/Spacing';

describe('<Rating />', () => {
  it('renders default', () => {
    const wrapper = shallowWithStyles(<Rating rating={0} />);

    expect(wrapper.find('div').prop('className')).toBe('ratingContainer');
  });

  it('renders micro', () => {
    const wrapper = shallowWithStyles(<Rating micro rating={0} />);

    expect(wrapper.find('div').prop('className')).toMatch('ratingContainer_micro');
  });

  it('renders small', () => {
    const wrapper = shallowWithStyles(<Rating small rating={0} />);

    expect(wrapper.find('div').prop('className')).toMatch('ratingContainer_small');
  });

  it('renders large', () => {
    const wrapper = shallowWithStyles(<Rating large rating={0} />);

    expect(wrapper.find('div').prop('className')).toMatch('ratingContainer_large');
  });

  it('renders reviews', () => {
    const wrapper = shallowWithStyles(<Rating reviews="100" />);

    expect(wrapper.find(Spacing).prop('children')).toBe('100');
  });

  it('renders all empty stars for a rating of 0', () => {
    const wrapper = shallowWithStyles(<Rating rating={0} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(0);
    expect(wrapper.find(IconStarHalf)).toHaveLength(0);
    expect(wrapper.find(IconStar)).toHaveLength(5);
  });

  it('renders expected stars for a rating between 0 and 1', () => {
    const wrapper = shallowWithStyles(<Rating rating={0.5} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(0);
    expect(wrapper.find(IconStarHalf)).toHaveLength(1);
    expect(wrapper.find(IconStar)).toHaveLength(4);
  });

  it('renders expected stars for a rating of 1', () => {
    const wrapper = shallowWithStyles(<Rating rating={1} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(1);
    expect(wrapper.find(IconStarHalf)).toHaveLength(0);
    expect(wrapper.find(IconStar)).toHaveLength(4);
  });

  it('renders expected stars for a rating between 1 and 2', () => {
    const wrapper = shallowWithStyles(<Rating rating={1.5} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(1);
    expect(wrapper.find(IconStarHalf)).toHaveLength(1);
    expect(wrapper.find(IconStar)).toHaveLength(3);
  });

  it('renders expected stars for a rating of 2', () => {
    const wrapper = shallowWithStyles(<Rating rating={2} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(2);
    expect(wrapper.find(IconStarHalf)).toHaveLength(0);
    expect(wrapper.find(IconStar)).toHaveLength(3);
  });

  it('renders expected stars for a rating between 2 and 3', () => {
    const wrapper = shallowWithStyles(<Rating rating={2.5} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(2);
    expect(wrapper.find(IconStarHalf)).toHaveLength(1);
    expect(wrapper.find(IconStar)).toHaveLength(2);
  });

  it('renders expected stars for a rating of 3', () => {
    const wrapper = shallowWithStyles(<Rating rating={3} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(3);
    expect(wrapper.find(IconStarHalf)).toHaveLength(0);
    expect(wrapper.find(IconStar)).toHaveLength(2);
  });

  it('renders expected stars for a rating between 3 and 4', () => {
    const wrapper = shallowWithStyles(<Rating rating={3.5} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(3);
    expect(wrapper.find(IconStarHalf)).toHaveLength(1);
    expect(wrapper.find(IconStar)).toHaveLength(1);
  });

  it('renders expected stars for a rating of 4', () => {
    const wrapper = shallowWithStyles(<Rating rating={4} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(4);
    expect(wrapper.find(IconStarHalf)).toHaveLength(0);
    expect(wrapper.find(IconStar)).toHaveLength(1);
  });

  it('renders expected stars for a rating between 4 and 5', () => {
    const wrapper = shallowWithStyles(<Rating rating={4.5} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(4);
    expect(wrapper.find(IconStarHalf)).toHaveLength(1);
    expect(wrapper.find(IconStar)).toHaveLength(0);
  });

  it('renders expected stars for a rating of 5', () => {
    const wrapper = shallowWithStyles(<Rating rating={5} />);

    expect(wrapper.find(IconStarFull)).toHaveLength(5);
    expect(wrapper.find(IconStarHalf)).toHaveLength(0);
    expect(wrapper.find(IconStar)).toHaveLength(0);
  });
});
