import React from 'react';
import { shallow } from 'enzyme';
import Content from '../../../src/components/Card/Content';
import Row from '../../../src/components/Row';

describe('<Card />', () => {
  it('renders a top image', () => {
    const imageUrl = 'TopFoo.jpg';
    const wrapper = shallow(<Content topImageSrc={imageUrl}>Sup</Content>).dive();

    expect(wrapper.find('img').prop('src')).toBe(imageUrl);
  });

  it('renders a left image', () => {
    const imageUrl = 'LeftFoo.jpg';
    const wrapper = shallow(<Content beforeImageSrc={imageUrl}>Sup</Content>).dive();

    expect(
      wrapper
        .find(Row)
        .dive()
        .html()
        .includes(imageUrl),
    ).toBe(true);
  });

  it('renders a right image', () => {
    const imageUrl = 'RightFoo.jpg';
    const wrapper = shallow(<Content afterImageSrc={imageUrl}>Sup</Content>).dive();

    expect(
      wrapper
        .find(Row)
        .dive()
        .html()
        .includes(imageUrl),
    ).toBe(true);
  });

  it('renders a button if `onClick` is provided', () => {
    const onClick = () => {};
    const wrapper = shallow(<Content onClick={onClick}>Sup</Content>).dive();

    expect(wrapper.find('button').prop('onClick')).toBe(onClick);
  });

  it('renders after content', () => {
    const after = '~~After~~';
    const wrapper = shallow(<Content after={after}>Sup</Content>).dive();

    expect(
      wrapper
        .find(Row)
        .dive()
        .html()
        .includes(after),
    ).toBe(true);
  });

  it('renders before content', () => {
    const before = '~*Before*~';
    const wrapper = shallow(<Content before={before}>Sup</Content>).dive();

    expect(
      wrapper
        .find(Row)
        .dive()
        .html()
        .includes(before),
    ).toBe(true);
  });

  it('renders before and after content', () => {
    const after = '~~After~~';
    const before = '~*Before*~';
    const wrapper = shallow(
      <Content after={after} before={before}>
        Sup
      </Content>,
    ).dive();

    const rowHtml = wrapper
      .find(Row)
      .dive()
      .html();

    expect(rowHtml.includes(after)).toBe(true);
    expect(rowHtml.includes(before)).toBe(true);
  });
});
