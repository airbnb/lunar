import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import List, { Item } from '../../src/components/List';
import { Props as ItemProps } from '../../src/components/List/Item';
import proxyComponent from '../../src/utils/proxyComponent';

describe('<List />', () => {
  it('does not error if a proxyComponent wrapping a Item is passed', () => {
    const ProxiedItem = proxyComponent(Item, (props: ItemProps) => <Item {...props} />);

    expect(() =>
      shallowWithStyles(
        <List>
          <ProxiedItem>Item 1</ProxiedItem>
        </List>,
      ),
    ).not.toThrowError();
  });

  it('renders expected number of List items', () => {
    const wrapper = shallowWithStyles(
      <List>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </List>,
    );

    expect(wrapper.find(Item)).toHaveLength(3);
  });

  it('handles falsey items', () => {
    const wrapper = shallowWithStyles(
      <List>
        {false && <Item>Item 1</Item>}
        {null && <Item>Item 2</Item>}
        <Item>Item 3</Item>
      </List>,
    );

    expect(wrapper.find(Item)).toHaveLength(1);
  });

  it('renders a <ul /> by default', () => {
    const wrapper = shallowWithStyles(
      <List>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.type()).toEqual('ul');
  });

  it('renders a <ol /> with `ordered`', () => {
    const wrapper = shallowWithStyles(
      <List ordered>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.type()).toEqual('ol');
  });

  it('renders a list with gutters', () => {
    const wrapper = shallowWithStyles(
      <List gutter>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.prop('className')).toContain('list_gutter');
  });

  it('renders a horizontal list with gutters', () => {
    const wrapper = shallowWithStyles(
      <List gutter horizontal>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.prop('className')).toContain('list_gutter_horizontal');
  });

  it('renders a horizontal list', () => {
    const wrapper = shallowWithStyles(
      <List horizontal>
        <Item>Item 1</Item>
      </List>,
    );

    expect(wrapper.prop('className')).toContain('list_horizontal');
  });
});
