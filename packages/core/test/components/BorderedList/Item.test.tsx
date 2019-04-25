import React from 'react';
import { shallow } from 'enzyme';
import BorderedListItem from '../../../src/components/BorderedList/Item';

describe('<BorderedListItem />', () => {
  it('errors if no children', () => {
    expect(() => {
      // @ts-ignore
      shallow(<BorderedListItem />);
    }).toThrowError();
  });

  it('renders a <li /> by default', () => {
    const wrapper = shallow(<BorderedListItem>Content</BorderedListItem>).dive();
    expect(wrapper.type()).toEqual('li');
  });

  it('renders compact', () => {
    const wrapperDefault = shallow(<BorderedListItem>Content</BorderedListItem>).dive();
    const wrapperCompact = shallow(<BorderedListItem compact>Content</BorderedListItem>).dive();

    expect(wrapperDefault.html() === wrapperCompact.html()).toBe(false);
  });

  it('renders spacious', () => {
    const wrapperDefault = shallow(<BorderedListItem>Content</BorderedListItem>).dive();
    const wrapperSpacious = shallow(<BorderedListItem spacious>Content</BorderedListItem>).dive();

    expect(wrapperDefault.html() === wrapperSpacious.html()).toBe(false);
  });
});
