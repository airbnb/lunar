import React from 'react';
import { shallow } from 'enzyme';
import List, { Item } from '../../src/components/List';
import { Props as ItemProps } from '../../src/components/List/Item';
import proxyComponent from '../../src/utils/proxyComponent';

describe('<List />', () => {
  it('does not error if a proxyComponent wrapping a Item is passed', () => {
    const ProxiedItem = proxyComponent(Item, (props: ItemProps) => <Item {...props} />);

    expect(() =>
      shallow(
        <List>
          <ProxiedItem>Item 1</ProxiedItem>
        </List>,
      ),
    ).not.toThrow();
  });

  it('renders expected number of List items', () => {
    const wrapper = shallow(
      <List>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </List>,
    );

    expect(wrapper.find(Item)).toHaveLength(3);
  });

  it('handles falsey items', () => {
    const wrapper = shallow(
      <List>
        {false && <Item>Item 1</Item>}
        {null && <Item>Item 2</Item>}
        <Item>Item 3</Item>
      </List>,
    );

    expect(wrapper.find(Item)).toHaveLength(1);
  });

  it('renders a <ul /> by default', () => {
    const wrapper = shallow(
      <List>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.type()).toEqual('ul');
  });

  it('renders a <ol /> with `ordered`', () => {
    const wrapper = shallow(
      <List ordered>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.type()).toEqual('ol');
  });

  it('renders a list with gutters', () => {
    const wrapper = shallow(
      <List gutter>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.prop('className')).toContain('list_gutter');
  });

  it('renders a horizontal list with gutters', () => {
    const wrapper = shallow(
      <List gutter horizontal>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.prop('className')).toContain('list_gutter_horizontal');
  });

  it('renders a horizontal list', () => {
    const wrapper = shallow(
      <List horizontal>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.prop('className')).toContain('list_horizontal');
  });
});
