import React from 'react';
import { shallow } from 'enzyme';
import Title from '../../src/components/Title';

describe('<Title />', () => {
  it('errors when multiple alignments are used at once', () => {
    expect(() => {
      shallow(
        <Title centerAlign endAlign level={1}>
          Default
        </Title>,
      );
    }).toThrow();
  });

  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallow(
        <Title muted inverted level={1}>
          Default
        </Title>,
      );
    }).toThrow();
  });

  it('renders level 1', () => {
    const wrapper = shallow(<Title level={1}>Title</Title>);

    expect(wrapper.prop('className')).toMatch('title_level1');
    expect(wrapper.type()).toBe('h1');
  });

  it('renders level 2', () => {
    const wrapper = shallow(<Title level={2}>Title</Title>);

    expect(wrapper.prop('className')).toMatch('title_level2');
    expect(wrapper.type()).toBe('h2');
  });

  it('renders level 3', () => {
    const wrapper = shallow(<Title level={3}>Title</Title>);

    expect(wrapper.prop('className')).toMatch('title_level3');
    expect(wrapper.type()).toBe('h3');
  });

  it('renders inline', () => {
    const wrapper = shallow(
      <Title inline level={1}>
        Inline
      </Title>,
    );

    expect(wrapper.prop('className')).toMatch('title_inline');
  });

  it('renders inverted', () => {
    const wrapper = shallow(
      <Title inverted level={1}>
        Inverted
      </Title>,
    );

    expect(wrapper.prop('className')).toMatch('title_inverted');
  });

  it('renders muted', () => {
    const wrapper = shallow(
      <Title muted level={1}>
        Muted
      </Title>,
    );

    expect(wrapper.prop('className')).toMatch('title_muted');
  });
});
