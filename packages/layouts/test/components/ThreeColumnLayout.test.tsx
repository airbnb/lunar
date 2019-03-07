import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../src/components/Layout';
import ThreeColumnLayout from '../../src/components/ThreeColumnLayout';

describe('<ThreeColumnLayout />', () => {
  // PROP TYPE CHECKS REQUIRE THE BABEL PLUGIN TO BE COMPLETE

  // it('errors if no `before`', () => {
  //   expect(() => {
  //     shallow(<ThreeColumnLayout after={<div />} />);
  //   }).toThrowError('error');
  // });

  // it('errors if no `after`', () => {
  //   expect(() => {
  //     shallow(<ThreeColumnLayout before={<div />} />);
  //   }).toThrowError('error');
  // });

  it('renders and passes props to `Layout`', () => {
    const wrapper = shallow(
      <ThreeColumnLayout fluid asideWidth={100} before="Left" after="Right">
        Child
      </ThreeColumnLayout>,
    );

    expect(wrapper.find(Layout).props()).toEqual(
      expect.objectContaining({
        children: 'Child',
        before: 'Left',
        after: 'Right',
        fluid: true,
        asideWidth: 100,
      }),
    );
  });
});
