import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../src/components/Layout';
import TwoColumnLayout from '../../src/components/TwoColumnLayout';

describe('<TwoColumnLayout />', () => {
  // PROP TYPE CHECKS REQUIRE THE BABEL PLUGIN TO BE COMPLETE

  // it('errors if no `aside`', () => {
  //   expect(() => {
  //     shallow(<TwoColumnLayout after={<div />} />);
  //   }).toThrowError('error');
  // });

  it('errors if `before` and `after` are used at the same time', () => {
    expect(() => {
      shallow(
        <TwoColumnLayout before after aside="Sidebar">
          Child
        </TwoColumnLayout>,
      );
    }).toThrowErrorMatchingSnapshot();
  });

  it('renders before and passes props to `Layout`', () => {
    const wrapper = shallow(
      <TwoColumnLayout fluid before aside="Sidebar">
        Child
      </TwoColumnLayout>,
    );

    expect(wrapper.find(Layout).props()).toEqual(
      expect.objectContaining({
        children: 'Child',
        before: 'Sidebar',
        after: null,
        fluid: true,
      }),
    );
  });

  it('renders after and passes props to `Layout`', () => {
    const wrapper = shallow(
      <TwoColumnLayout fluid after aside="Sidebar">
        Child
      </TwoColumnLayout>,
    );

    expect(wrapper.find(Layout).props()).toEqual(
      expect.objectContaining({
        children: 'Child',
        after: 'Sidebar',
        before: null,
        fluid: true,
      }),
    );
  });
});
