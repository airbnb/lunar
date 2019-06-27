import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Content from '../../../src/components/Card/Content';
import Row from '../../../src/components/Row';

describe('<Card />', () => {
  it('renders a top image', () => {
    const imageUrl = 'TopFoo.jpg';
    const wrapper = shallowWithStyles(<Content topImageSrc={imageUrl}>Sup</Content>);

    expect(wrapper.find('img').prop('src')).toBe(imageUrl);
  });

  it('renders a left image', () => {
    const imageUrl = 'LeftFoo.jpg';
    const wrapper = shallowWithStyles(<Content beforeImageSrc={imageUrl}>Sup</Content>);

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
    const wrapper = shallowWithStyles(<Content afterImageSrc={imageUrl}>Sup</Content>);

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
    const wrapper = shallowWithStyles(<Content onClick={onClick}>Sup</Content>);

    expect(wrapper.find('button').prop('onClick')).toBe(onClick);
  });

  it('renders after content', () => {
    const after = '~~After~~';
    const wrapper = shallowWithStyles(<Content after={after}>Sup</Content>);

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
    const wrapper = shallowWithStyles(<Content before={before}>Sup</Content>);

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
    const wrapper = shallowWithStyles(
      <Content after={after} before={before}>
        Sup
      </Content>,
    );

    const rowHtml = wrapper
      .find(Row)
      .dive()
      .html();

    expect(rowHtml.includes(after)).toBe(true);
    expect(rowHtml.includes(before)).toBe(true);
  });
});
