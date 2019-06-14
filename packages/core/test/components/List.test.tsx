import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import List from '../../src/components/List';
import ListItem, { Props as ListItemProps } from '../../src/components/List/Item';
import proxyComponent from '../../src/utils/proxyComponent';

function unwrap(element: any): Enzyme.ShallowWrapper {
  return unwrapHOCs(shallow(element), 'List', {}, { render: true });
}

describe('<List />', () => {
  it('errors if non-List item children are passed', () => {
    expect(() => unwrap(<List>Foo</List>)).toThrowError();
  });

  it('does not error if a proxyComponent wrapping a ListItem is passed', () => {
    const ProxiedListItem = proxyComponent(ListItem, (props: ListItemProps) => (
      <ListItem {...props} />
    ));

    expect(() =>
      unwrap(
        <List>
          <ProxiedListItem>Item 1</ProxiedListItem>
        </List>,
      ),
    ).not.toThrowError();
  });

  it('errors if proxyComponent wrapping a non-ListItem is passed', () => {
    const IncompatibleComponent = () => <div />;
    const ProxiedNonListItem = proxyComponent(IncompatibleComponent, () => <div />);

    expect(() =>
      unwrap(
        <List>
          <ProxiedNonListItem>Foo</ProxiedNonListItem>
        </List>,
      ),
    ).toThrowError();
  });

  it('renders expected number of List items', () => {
    const wrapper = unwrap(
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>,
    );

    expect(wrapper.find(ListItem)).toHaveLength(3);
  });

  it('handles falsey items', () => {
    const wrapper = unwrap(
      <List>
        {false && <ListItem>Item 1</ListItem>}
        {null && <ListItem>Item 2</ListItem>}
        <ListItem>Item 3</ListItem>
      </List>,
    );

    expect(wrapper.find(ListItem)).toHaveLength(1);
  });

  it('renders a <ul /> by default', () => {
    const wrapper = shallow(
      <List>
        <ListItem>Item 1</ListItem>
      </List>,
    ).dive();

    expect(wrapper.type()).toEqual('ul');
  });

  it('renders a <ol /> with `ordered`', () => {
    const wrapper = shallow(
      <List ordered>
        <ListItem>Item 1</ListItem>
      </List>,
    ).dive();

    expect(wrapper.type()).toEqual('ol');
  });
});
