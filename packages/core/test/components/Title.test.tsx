import React from 'react';
import { shallow } from 'enzyme';
import Title from '../../src/components/Title';

describe('<Title />', () => {
  it('errors when multiple alignments are used at once', () => {
    expect(() => {
      shallow(
        <Title level={1} centerAlign endAlign>
          Default
        </Title>,
      ).dive();
    }).toThrowError();
  });

  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallow(
        <Title level={1} muted inverted>
          Default
        </Title>,
      ).dive();
    }).toThrowError();
  });

  it('renders level 1', () => {
    const wrapper = shallow(<Title level={1}>Title</Title>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders level 2', () => {
    const wrapper = shallow(<Title level={2}>Title</Title>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders level 3', () => {
    const wrapper = shallow(<Title level={3}>Title</Title>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inline', () => {
    const wrapper = shallow(
      <Title level={1} inline>
        Inline
      </Title>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inverted', () => {
    const wrapper = shallow(
      <Title level={1} inverted>
        Inverted
      </Title>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders muted', () => {
    const wrapper = shallow(
      <Title level={1} muted>
        Muted
      </Title>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
