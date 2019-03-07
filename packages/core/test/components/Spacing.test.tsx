import React from 'react';
import { shallow } from 'enzyme';
import Spacing from '../../src/components/Spacing';

describe('<Spacing />', () => {
  it('renders with a side', () => {
    const wrapper = shallow(<Spacing top={1}>Content</Spacing>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with many sides', () => {
    const wrapper = shallow(
      <Spacing top={1} bottom={3} left={2} right={4}>
        Content
      </Spacing>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders as inline', () => {
    const wrapper = shallow(
      <Spacing vertical={2} inline>
        Content
      </Spacing>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with padding', () => {
    const wrapper = shallow(
      <Spacing all={2} inner>
        Content
      </Spacing>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a <div /> by default', () => {
    const wrapper = shallow(<Spacing>Content</Spacing>).dive();
    expect(wrapper.type()).toEqual('div');
  });

  it('renders with the passed in tag type', () => {
    const wrapper = shallow(<Spacing tag="footer">Footer content</Spacing>).dive();
    expect(wrapper.type()).toEqual('footer');
  });
});
