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
      ).dive();
    }).toThrowError();
  });

  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallow(
        <Text muted inverted>
          Default
        </Text>,
      ).dive();
    }).toThrowError();
  });

  it('errors when multiple emphasis are used at once', () => {
    expect(() => {
      shallow(
        <Text light bold>
          Default
        </Text>,
      ).dive();
    }).toThrowError();
  });

  it('errors when multiple sizes are used at once', () => {
    expect(() => {
      shallow(
        <Text small large>
          Default
        </Text>,
      ).dive();
    }).toThrowError();
  });

  it('can render without children', () => {
    const wrapper = shallow(<Text />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('uses `div` tag by default', () => {
    const wrapper = shallow(<Text>Default</Text>).dive();

    expect(wrapper.type()).toBe('div');
  });

  it('changes tag to `span` if `inline` is passed', () => {
    const wrapper = shallow(<Text inline>Default</Text>).dive();

    expect(wrapper.type()).toBe('span');
  });

  it('changes tag to `small` if `micro` is passed', () => {
    const wrapper = shallow(<Text micro>Default</Text>).dive();

    expect(wrapper.type()).toBe('small');
  });

  it('changes tag to `h4` if `large` is passed', () => {
    const wrapper = shallow(<Text large>Default</Text>).dive();

    expect(wrapper.type()).toBe('h4');
  });

  it('renders light', () => {
    const wrapper = shallow(<Text light>Light</Text>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders bold', () => {
    const wrapper = shallow(<Text bold>Bold</Text>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders micro', () => {
    const wrapper = shallow(<Text micro>Micro</Text>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders small', () => {
    const wrapper = shallow(<Text small>Small</Text>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders large', () => {
    const wrapper = shallow(<Text large>Large</Text>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders disabled', () => {
    const wrapper = shallow(<Text disabled>Disabled</Text>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inline', () => {
    const wrapper = shallow(<Text inline>Inline</Text>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inverted', () => {
    const wrapper = shallow(<Text inverted>Inverted</Text>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders muted', () => {
    const wrapper = shallow(<Text muted>Muted</Text>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with preserved whitespace', () => {
    const wrapper = shallow(
      <Text preserveWhitespace>
        {'   '}
        Preserved whitespace
        {'   '}
      </Text>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders uppercased', () => {
    const wrapper = shallow(<Text uppercased>Uppercased</Text>).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
