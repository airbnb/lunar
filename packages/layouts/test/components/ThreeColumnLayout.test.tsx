import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../src/components/Layout';
import Aside from '../../src/components/Aside';
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
      <ThreeColumnLayout fluid before={<Aside>Left</Aside>} after={<Aside>Right</Aside>}>
        Child
      </ThreeColumnLayout>,
    );

    expect(wrapper.find(Layout).props()).toEqual(
      expect.objectContaining({
        children: 'Child',
        before: <Aside>Left</Aside>,
        after: <Aside>Right</Aside>,
        fluid: true,
      }),
    );
  });
});
