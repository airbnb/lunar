import React from 'react';
import { shallow } from 'enzyme';
import Content from '../../../src/components/Card/Content';
import Row from '../../../src/components/Row';
import Spacing from '../../../src/components/Spacing';

describe('<Card />', () => {
  it('renders a button if `onClick` is provided', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const onClick = () => {};
    const wrapper = shallow(<Content onClick={onClick}>Sup</Content>);

    expect(wrapper.find('button').prop('onClick')).toBe(onClick);
  });

  it('renders after content', () => {
    const after = '~~After~~';
    const wrapper = shallow(<Content after={after}>Sup</Content>);

    expect(shallow(wrapper.find(Row).prop('after') as React.ReactElement).contains(after)).toBe(
      true,
    );
  });

  it('renders after content with no padding', () => {
    const after = '~~After~~';
    const wrapper = shallow(
      <Content noPaddingAfter after={after}>
        Sup
      </Content>,
    );

    expect(shallow(wrapper.find(Row).prop('after') as React.ReactElement).hasClass('after')).toBe(
      true,
    );

    expect(
      shallow(wrapper.find(Row).prop('after') as React.ReactElement).hasClass('side_noPadding'),
    ).toBe(true);
  });

  it('renders before content', () => {
    const before = '~*Before*~';
    const wrapper = shallow(<Content before={before}>Sup</Content>);

    expect(shallow(wrapper.find(Row).prop('before') as React.ReactElement).contains(before)).toBe(
      true,
    );
  });

  it('renders before content with no padding', () => {
    const before = '~~Before~~';
    const wrapper = shallow(
      <Content noPaddingBefore before={before}>
        Sup
      </Content>,
    );

    expect(shallow(wrapper.find(Row).prop('before') as React.ReactElement).hasClass('before')).toBe(
      true,
    );

    expect(
      shallow(wrapper.find(Row).prop('before') as React.ReactElement).hasClass('side_noPadding'),
    ).toBe(true);
  });

  it('renders top content', () => {
    const top = '~*Top*~';
    const wrapper = shallow(<Content top={top}>Sup</Content>);

    expect(wrapper.contains(top)).toBe(true);
  });

  it('renders top content with no padding', () => {
    const top = '~~Top~~';
    const wrapper = shallow(
      <Content noPaddingTop top={top}>
        Sup
      </Content>,
    );

    expect(
      wrapper
        .find(Spacing)
        .at(0)
        .prop('horizontal'),
    ).toBe(0);

    expect(
      wrapper
        .find(Spacing)
        .at(0)
        .prop('top'),
    ).toBe(0);
  });

  it('renders before content as clickable', () => {
    const before = '~*Before*~';
    const handleClick = jest.fn();
    const wrapper = shallow(
      <Content before={before} onBeforeClick={handleClick}>
        Sup
      </Content>,
    );

    shallow(wrapper.find(Row).prop('before') as React.ReactElement)
      .find('button')
      .simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders after content as clickable', () => {
    const after = '~~After~~';
    const handleClick = jest.fn();
    const wrapper = shallow(
      <Content after={after} onAfterClick={handleClick}>
        Sup
      </Content>,
    );

    shallow(wrapper.find(Row).prop('after') as React.ReactElement)
      .find('button')
      .simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders before and after content', () => {
    const after = '~~After~~';
    const before = '~*Before*~';
    const wrapper = shallow(
      <Content after={after} before={before}>
        Sup
      </Content>,
    );

    expect(shallow(wrapper.find(Row).prop('after') as React.ReactElement).contains(after)).toBe(
      true,
    );

    expect(shallow(wrapper.find(Row).prop('before') as React.ReactElement).contains(before)).toBe(
      true,
    );
  });

  it('renders before, after, and top content', () => {
    const after = '~~After~~';
    const before = '~*Before*~';
    const top = '~*Top*~';
    const wrapper = shallow(
      <Content noPaddingAfter after={after} before={before} top={top}>
        Sup
      </Content>,
    );

    expect(shallow(wrapper.find(Row).prop('after') as React.ReactElement).contains(after)).toBe(
      true,
    );

    expect(shallow(wrapper.find(Row).prop('before') as React.ReactElement).contains(before)).toBe(
      true,
    );

    expect(wrapper.contains(top)).toBe(true);
  });

  it('renders middleAlign content', () => {
    const wrapper = shallow(<Content middleAlign>Sup</Content>);

    expect(wrapper.find(Row).prop('middleAlign')).toBe(true);
  });
});
