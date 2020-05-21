import React from 'react';
import { shallow } from 'enzyme';
import List, { Item } from '../../src/components/List';
import { ListItemProps } from '../../src/components/List/Item';
import proxyComponent from '../../src/utils/proxyComponent';

describe('<List />', () => {
  it('does not error if a proxyComponent wrapping a Item is passed', () => {
    const ProxiedItem = proxyComponent(Item, (props: ListItemProps) => <Item {...props} />);

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

  it('renders a reversed list with gutters', () => {
    const wrapper = shallow(
      <List gutter reversed>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.prop('className')).toContain('list_gutter_reversed');
  });

  it('renders a horizontal list with gutters', () => {
    const wrapper = shallow(
      <List horizontal gutter>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.prop('className')).toContain('list_gutter_horizontal');
  });

  it('renders a reversed horizontal list with gutters', () => {
    const wrapper = shallow(
      <List reversed horizontal gutter>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.prop('className')).toContain('list_gutter_horizontal_reversed');
  });

  it('renders a horizontal list', () => {
    const wrapper = shallow(
      <List horizontal>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.prop('className')).toContain('list_horizontal');
  });

  it('renders a reversed list', () => {
    const wrapper = shallow(
      <List reversed>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.prop('className')).toContain('list_reversed');
  });

  it('renders a horizontal reversed list', () => {
    const wrapper = shallow(
      <List horizontal reversed>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.prop('className')).toContain('list_reversed_horizontal');
  });

  it('renders a list with middleAlign', () => {
    const wrapper = shallow(
      <List middleAlign>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.prop('className')).toContain('list_middleAlign');
  });
});
