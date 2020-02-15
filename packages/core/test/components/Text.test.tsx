import React from 'react';
import { shallow } from 'enzyme';
import Text from '../../src/components/Text';

describe('<Text />', () => {
  it('errors when multiple alignments are used at once', () => {
    expect(() => {
      shallow(
        <Text startAlign endAlign>
          Default
        </Text>,
      );
    }).toThrow();
  });

  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallow(
        <Text muted inverted>
          Default
        </Text>,
      );
    }).toThrow();
  });

  it('errors when multiple emphasis are used at once', () => {
    expect(() => {
      shallow(
        <Text light bold>
          Default
        </Text>,
      );
    }).toThrow();
  });

  it('errors when multiple sizes are used at once', () => {
    expect(() => {
      shallow(
        <Text small large>
          Default
        </Text>,
      );
    }).toThrow();
  });

  it('can render without children', () => {
    const wrapper = shallow(<Text />);

    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('uses `div` tag by default', () => {
    const wrapper = shallow(<Text>Default</Text>);

    expect(wrapper.type()).toBe('div');
  });

  it('changes tag to `span` if `inline` is passed', () => {
    const wrapper = shallow(<Text inline>Default</Text>);

    expect(wrapper.type()).toBe('span');
  });

  it('changes tag to `small` if `micro` is passed', () => {
    const wrapper = shallow(<Text micro>Default</Text>);

    expect(wrapper.type()).toBe('small');
  });

  it('changes tag to `h4` if `large` is passed', () => {
    const wrapper = shallow(<Text large>Default</Text>);

    expect(wrapper.type()).toBe('h4');
  });

  it('renders light', () => {
    const wrapper = shallow(<Text light>Light</Text>);

    expect(wrapper.prop('className')).toMatch('text_light');
  });

  it('renders bold', () => {
    const wrapper = shallow(<Text bold>Bold</Text>);

    expect(wrapper.prop('className')).toMatch('text_bold');
  });

  it('renders micro', () => {
    const wrapper = shallow(<Text micro>Micro</Text>);

    expect(wrapper.prop('className')).toMatch('text_micro');
  });

  it('renders small', () => {
    const wrapper = shallow(<Text small>Small</Text>);

    expect(wrapper.prop('className')).toMatch('text_small');
  });

  it('renders large', () => {
    const wrapper = shallow(<Text large>Large</Text>);

    expect(wrapper.prop('className')).toMatch('text_large');
  });

  it('renders disabled', () => {
    const wrapper = shallow(<Text disabled>Disabled</Text>);

    expect(wrapper.prop('className')).toMatch('text_disabled');
  });

  it('renders inline', () => {
    const wrapper = shallow(<Text inline>Inline</Text>);

    expect(wrapper.prop('className')).toMatch('text_inline');
  });

  it('renders inverted', () => {
    const wrapper = shallow(<Text inverted>Inverted</Text>);

    expect(wrapper.prop('className')).toMatch('text_inverted');
  });

  it('renders muted', () => {
    const wrapper = shallow(<Text muted>Muted</Text>);

    expect(wrapper.prop('className')).toMatch('text_muted');
  });

  it('renders with preserved whitespace', () => {
    const wrapper = shallow(
      <Text preserveWhitespace>
        {'   '}
        Preserved whitespace
        {'   '}
      </Text>,
    );

    expect(wrapper.prop('className')).toMatch('text_preserveWhitespace');
  });

  it('renders uppercased', () => {
    const wrapper = shallow(<Text uppercased>Uppercased</Text>);

    expect(wrapper.prop('className')).toMatch('text_uppercased');
  });
});
