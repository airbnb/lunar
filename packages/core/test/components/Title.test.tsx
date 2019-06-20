import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Title from '../../src/components/Title';

describe('<Title />', () => {
  it('errors when multiple alignments are used at once', () => {
    expect(() => {
      shallowWithStyles(
        <Title level={1} centerAlign endAlign>
          Default
        </Title>,
      );
    }).toThrowError();
  });

  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallowWithStyles(
        <Title level={1} muted inverted>
          Default
        </Title>,
      );
    }).toThrowError();
  });

  it('renders level 1', () => {
    const wrapper = shallowWithStyles(<Title level={1}>Title</Title>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders level 2', () => {
    const wrapper = shallowWithStyles(<Title level={2}>Title</Title>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders level 3', () => {
    const wrapper = shallowWithStyles(<Title level={3}>Title</Title>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inline', () => {
    const wrapper = shallowWithStyles(
      <Title level={1} inline>
        Inline
      </Title>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inverted', () => {
    const wrapper = shallowWithStyles(
      <Title level={1} inverted>
        Inverted
      </Title>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders muted', () => {
    const wrapper = shallowWithStyles(
      <Title level={1} muted>
        Muted
      </Title>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
