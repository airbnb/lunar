import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import List, { Item } from '../../src/components/List';
import { Props as ItemProps } from '../../src/components/List/Item';
import proxyComponent from '../../src/utils/proxyComponent';

function unwrap(element: any): Enzyme.ShallowWrapper {
  return unwrapHOCs(shallow(element), 'List', {}, { render: true });
}

describe('<List />', () => {
  it('errors if non-List item children are passed', () => {
    expect(() => unwrap(<List>Foo</List>)).toThrowError();
  });

  it('does not error if a proxyComponent wrapping a Item is passed', () => {
    const ProxiedItem = proxyComponent(Item, (props: ItemProps) => <Item {...props} />);

    expect(() =>
      unwrap(
        <List>
          <ProxiedItem>Item 1</ProxiedItem>
        </List>,
      ),
    ).not.toThrowError();
  });

  it('errors if proxyComponent wrapping a non-Item is passed', () => {
    const IncompatibleComponent = () => <div />;
    const ProxiedNonItem = proxyComponent(IncompatibleComponent, () => <div />);

    expect(() =>
      unwrap(
        <List>
          <ProxiedNonItem>Foo</ProxiedNonItem>
        </List>,
      ),
    ).toThrowError();
  });

  it('renders expected number of List items', () => {
    const wrapper = unwrap(
      <List>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </List>,
    );

    expect(wrapper.find(Item)).toHaveLength(3);
  });

  it('handles falsey items', () => {
    const wrapper = unwrap(
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
    ).dive();

    expect(wrapper.type()).toEqual('ul');
  });

  it('renders a <ol /> with `ordered`', () => {
    const wrapper = shallow(
      <List ordered>
        <Item>Item 1</Item>
      </List>,
    ).dive();

    expect(wrapper.type()).toEqual('ol');
  });

  it('renders a horizontal list', () => {
    const wrapperDefault = shallow(
      <List>
        <Item>Item 1</Item>
      </List>,
    ).dive();

    const wrapperHorizontal = shallow(
      <List horizontal>
        <Item>Item 1</Item>
      </List>,
    ).dive();

    expect(wrapperDefault.html() === wrapperHorizontal.html()).toBe(false);
  });
});
