import React from 'react';
import { shallow } from 'enzyme';
import ListItem from '../../../src/components/List/Item';

describe('<ListItem />', () => {
  it('errors if no children', () => {
    expect(() => {
      // @ts-ignore
      shallow(<ListItem />);
    }).toThrowError();
  });

  it('renders a <li /> by default', () => {
    const wrapper = shallow(<ListItem>Content</ListItem>).dive();
    expect(wrapper.type()).toEqual('li');
  });

  it('renders bordered', () => {
    const wrapperDefault = shallow(<ListItem>Content</ListItem>).dive();
    const wrapperBordered = shallow(<ListItem bordered>Content</ListItem>).dive();

    expect(wrapperDefault.html() === wrapperBordered.html()).toBe(false);
  });

  it('renders compact', () => {
    const wrapperDefault = shallow(<ListItem>Content</ListItem>).dive();
    const wrapperCompact = shallow(<ListItem compact>Content</ListItem>).dive();

    expect(wrapperDefault.html() === wrapperCompact.html()).toBe(false);
  });

  it('renders spacious', () => {
    const wrapperDefault = shallow(<ListItem>Content</ListItem>).dive();
    const wrapperSpacious = shallow(<ListItem spacious>Content</ListItem>).dive();

    expect(wrapperDefault.html() === wrapperSpacious.html()).toBe(false);
  });

  it('renders horizontal + bordered', () => {
    const wrapperDefault = shallow(<ListItem bordered>Content</ListItem>).dive();
    const wrapperHorizontal = shallow(
      <ListItem bordered horizontal>
        Content
      </ListItem>,
    ).dive();

    expect(wrapperDefault.html() === wrapperHorizontal.html()).toBe(false);
  });

  it('renders horizontal + compact', () => {
    const wrapperDefault = shallow(<ListItem compact>Content</ListItem>).dive();
    const wrapperHorizontal = shallow(
      <ListItem compact horizontal>
        Content
      </ListItem>,
    ).dive();

    expect(wrapperDefault.html() === wrapperHorizontal.html()).toBe(false);
  });

  it('renders horizontal + spacious', () => {
    const wrapperDefault = shallow(<ListItem spacious>Content</ListItem>).dive();
    const wrapperHorizontal = shallow(
      <ListItem spacious horizontal>
        Content
      </ListItem>,
    ).dive();

    expect(wrapperDefault.html() === wrapperHorizontal.html()).toBe(false);
  });
});
