import React from 'react';
import { shallow } from 'enzyme';
import Content from '../../../src/components/Card/Content';
import Row from '../../../src/components/Row';

describe('<Card />', () => {
  it('renders a top image', () => {
    const imageUrl = 'TopFoo.jpg';
    const wrapper = shallow(<Content topImageSrc={imageUrl}>Sup</Content>);

    expect(wrapper.find('img').prop('src')).toBe(imageUrl);
  });

  it('renders a left image', () => {
    const imageUrl = 'LeftFoo.jpg';
    const wrapper = shallow(<Content beforeImageSrc={imageUrl}>Sup</Content>);

    expect(
      (wrapper.find(Row).prop('before')! as React.ReactElement<{ src: string }>).props.src,
    ).toBe(imageUrl);
  });

  it('renders a right image', () => {
    const imageUrl = 'RightFoo.jpg';
    const wrapper = shallow(<Content afterImageSrc={imageUrl}>Sup</Content>);

    expect(
      (wrapper.find(Row).prop('after') as React.ReactElement<{ src: string }>)!.props.src,
    ).toBe(imageUrl);
  });

  it('renders a button if `onClick` is provided', () => {
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

  it('renders before content', () => {
    const before = '~*Before*~';
    const wrapper = shallow(<Content before={before}>Sup</Content>);

    expect(shallow(wrapper.find(Row).prop('before') as React.ReactElement).contains(before)).toBe(
      true,
    );
  });

  it('renders before content as clickable', () => {
    const imageUrl = 'LeftFoo.jpg';
    const handleClick = jest.fn();
    const wrapper = shallow(
      <Content beforeImageSrc={imageUrl} onBeforeImageClick={handleClick}>
        Sup
      </Content>,
    );

    shallow(wrapper.find(Row).prop('before') as React.ReactElement)
      .find('button')
      .simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders after content as clickable', () => {
    const imageUrl = 'RightFoo.jpg';
    const handleClick = jest.fn();
    const wrapper = shallow(
      <Content afterImageSrc={imageUrl} onAfterImageClick={handleClick}>
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
});
