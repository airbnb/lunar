import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../src/components/Layout';
import Aside from '../../src/components/Aside';
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
    const wrapper = shallow(
      <SplitLayout before={<Aside>Left</Aside>} after={<Aside>Right</Aside>} />,
    ).dive();

    expect(wrapper.find(Layout).props()).toEqual(
      expect.objectContaining({
        noBackground: true,
        noPadding: true,
      }),
    );
  });

  it('renders before and after content', () => {
    const wrapper = shallow(
      <SplitLayout before={<Aside>Left</Aside>} after={<Aside>Right</Aside>} />,
    ).dive();

    expect(
      wrapper
        .find(Aside)
        .at(0)
        .prop('children'),
    ).toBe('Left');

    expect(
      wrapper
        .find(Aside)
        .at(1)
        .prop('children'),
    ).toBe('Right');
  });
});
