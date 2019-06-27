import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Text from '../../src/components/Text';

describe('<Text />', () => {
  it('errors when multiple alignments are used at once', () => {
    expect(() => {
      shallowWithStyles(
        <Text startAlign endAlign>
          Default
        </Text>,
      );
    }).toThrowError();
  });

  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallowWithStyles(
        <Text muted inverted>
          Default
        </Text>,
      );
    }).toThrowError();
  });

  it('errors when multiple emphasis are used at once', () => {
    expect(() => {
      shallowWithStyles(
        <Text light bold>
          Default
        </Text>,
      );
    }).toThrowError();
  });

  it('errors when multiple sizes are used at once', () => {
    expect(() => {
      shallowWithStyles(
        <Text small large>
          Default
        </Text>,
      );
    }).toThrowError();
  });

  it('can render without children', () => {
    const wrapper = shallowWithStyles(<Text />);

    expect(wrapper).toMatchSnapshot();
  });

  it('uses `div` tag by default', () => {
    const wrapper = shallowWithStyles(<Text>Default</Text>);

    expect(wrapper.type()).toBe('div');
  });

  it('changes tag to `span` if `inline` is passed', () => {
    const wrapper = shallowWithStyles(<Text inline>Default</Text>);

    expect(wrapper.type()).toBe('span');
  });

  it('changes tag to `small` if `micro` is passed', () => {
    const wrapper = shallowWithStyles(<Text micro>Default</Text>);

    expect(wrapper.type()).toBe('small');
  });

  it('changes tag to `h4` if `large` is passed', () => {
    const wrapper = shallowWithStyles(<Text large>Default</Text>);

    expect(wrapper.type()).toBe('h4');
  });

  it('renders light', () => {
    const wrapper = shallowWithStyles(<Text light>Light</Text>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders bold', () => {
    const wrapper = shallowWithStyles(<Text bold>Bold</Text>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders micro', () => {
    const wrapper = shallowWithStyles(<Text micro>Micro</Text>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders small', () => {
    const wrapper = shallowWithStyles(<Text small>Small</Text>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders large', () => {
    const wrapper = shallowWithStyles(<Text large>Large</Text>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders disabled', () => {
    const wrapper = shallowWithStyles(<Text disabled>Disabled</Text>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inline', () => {
    const wrapper = shallowWithStyles(<Text inline>Inline</Text>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inverted', () => {
    const wrapper = shallowWithStyles(<Text inverted>Inverted</Text>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders muted', () => {
    const wrapper = shallowWithStyles(<Text muted>Muted</Text>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with preserved whitespace', () => {
    const wrapper = shallowWithStyles(
      <Text preserveWhitespace>
        {'   '}
        Preserved whitespace
        {'   '}
      </Text>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders uppercased', () => {
    const wrapper = shallowWithStyles(<Text uppercased>Uppercased</Text>);

    expect(wrapper).toMatchSnapshot();
  });
});
