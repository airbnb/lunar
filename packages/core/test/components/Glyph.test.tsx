import React from 'react';
import { shallow } from 'enzyme';
import Glyph from '../../src/components/Glyph';

describe('<Glyph />', () => {
  it('renders normal by default', () => {
    const wrapper = shallow(<Glyph>Text</Glyph>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders diagonal fraction', () => {
    const wrapper = shallow(<Glyph diagonal>1/3</Glyph>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders stacked fraction', () => {
    const wrapper = shallow(<Glyph stacked>1/3</Glyph>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders ordinal suffix', () => {
    const wrapper = shallow(<Glyph ordinal>1st</Glyph>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders slashed zero', () => {
    const wrapper = shallow(<Glyph slashed>100</Glyph>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders tabular numbers', () => {
    const wrapper = shallow(<Glyph tabular>123.45</Glyph>);

    expect(wrapper).toMatchSnapshot();
  });
});
