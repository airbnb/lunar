import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../src/components/Layout';
import SplitLayout from '../../src/components/SplitLayout';

describe('<SplitLayout />', () => {
  // PROP TYPE CHECKS REQUIRE THE BABEL PLUGIN TO BE COMPLETE

  // it('errors if no `before`', () => {
  //   expect(() => {
  //     shallow(<SplitLayout after={<div />} />).dive();
  //   }).toThrowError('error');
  // });

  // it('errors if no `after`', () => {
  //   expect(() => {
  //     shallow(<SplitLayout before={<div />} />).dive();
  //   }).toThrowError('error');
  // });

  it('renders and passes props to `Layout`', () => {
    const wrapper = shallow(<SplitLayout asideWidth={100} before="Left" after="Right" />).dive();

    expect(wrapper.find(Layout).props()).toEqual(
      expect.objectContaining({
        asideWidth: 100,
        noBackground: true,
        noPadding: true,
      }),
    );
  });

  it('renders before and after content', () => {
    const wrapper = shallow(<SplitLayout before="Left" after="Right" />).dive();

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('children'),
    ).toBe('Left');

    expect(
      wrapper
        .find('div')
        .at(2)
        .prop('children'),
    ).toBe('Right');
  });
});
