import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import BorderedList from '../../src/components/BorderedList';
import BorderedListItem, {
  Props as BorderedListItemProps,
} from '../../src/components/BorderedList/Item';
import proxyComponent from '../../src/utils/proxyComponent';

function unwrap(element: any): Enzyme.ShallowWrapper {
  return unwrapHOCs(shallow(element), 'BorderedList', {}, { render: true });
}

describe('<BorderedList />', () => {
  it('errors if non-BorderedList item children are passed', () => {
    expect(() => unwrap(<BorderedList>Foo</BorderedList>)).toThrowError();
  });

  it('does not error if a proxyComponent wrapping a BorderedListItem is passed', () => {
    const ProxiedBorderedListItem = proxyComponent(
      BorderedListItem,
      (props: BorderedListItemProps) => <BorderedListItem {...props} />,
    );

    expect(() =>
      unwrap(
        <BorderedList>
          <ProxiedBorderedListItem>Item 1</ProxiedBorderedListItem>
        </BorderedList>,
      ),
    ).not.toThrowError();
  });

  it('errors if proxyComponent wrapping a non-BorderedListItem is passed', () => {
    const IncompatibleComponent = () => <div />;
    const ProxiedNonBorderedListItem = proxyComponent(IncompatibleComponent, () => <div />);

    expect(() =>
      unwrap(
        <BorderedList>
          <ProxiedNonBorderedListItem>Foo</ProxiedNonBorderedListItem>
        </BorderedList>,
      ),
    ).toThrowError();
  });

  it('renders expected number of BorderedList items', () => {
    const wrapper = unwrap(
      <BorderedList>
        <BorderedListItem>Item 1</BorderedListItem>
        <BorderedListItem>Item 2</BorderedListItem>
        <BorderedListItem>Item 3</BorderedListItem>
      </BorderedList>,
    );

    expect(wrapper.find(BorderedListItem)).toHaveLength(3);
  });

  it('handles falsey items', () => {
    const wrapper = unwrap(
      <BorderedList>
        {false && <BorderedListItem>Item 1</BorderedListItem>}
        {null && <BorderedListItem>Item 2</BorderedListItem>}
        <BorderedListItem>Item 3</BorderedListItem>
      </BorderedList>,
    );

    expect(wrapper.find(BorderedListItem)).toHaveLength(1);
  });
});
