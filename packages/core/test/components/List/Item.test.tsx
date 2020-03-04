import React from 'react';
import { mount, shallow } from 'enzyme';
import ListItem from '../../../src/components/List/Item';

describe('<ListItem />', () => {
  it('renders a <li /> by default', () => {
    const wrapper = shallow(<ListItem>Content</ListItem>);
    expect(wrapper.type()).toEqual('li');
  });

  it('renders bordered', () => {
    const wrapperDefault = mount(<ListItem>Content</ListItem>);
    const wrapperBordered = mount(<ListItem bordered>Content</ListItem>);

    expect(wrapperDefault.debug() === wrapperBordered.debug()).toBe(false);
  });

  it('renders compact', () => {
    const wrapperDefault = mount(<ListItem>Content</ListItem>);
    const wrapperCompact = mount(<ListItem compact>Content</ListItem>);

    expect(wrapperDefault.debug() === wrapperCompact.debug()).toBe(false);
  });

  it('renders spacious', () => {
    const wrapperDefault = mount(<ListItem>Content</ListItem>);
    const wrapperSpacious = mount(<ListItem spacious>Content</ListItem>);

    expect(wrapperDefault.debug() === wrapperSpacious.debug()).toBe(false);
  });

  it('renders horizontal + bordered', () => {
    const wrapperDefault = mount(<ListItem bordered>Content</ListItem>);
    const wrapperHorizontal = mount(
      <ListItem bordered horizontal>
        Content
      </ListItem>,
    );

    expect(wrapperDefault.debug() === wrapperHorizontal.debug()).toBe(false);
  });

  it('renders horizontal + compact', () => {
    const wrapperDefault = mount(<ListItem compact>Content</ListItem>);
    const wrapperHorizontal = mount(
      <ListItem compact horizontal>
        Content
      </ListItem>,
    );

    expect(wrapperDefault.debug() === wrapperHorizontal.debug()).toBe(false);
  });

  it('renders horizontal + spacious', () => {
    const wrapperDefault = mount(<ListItem spacious>Content</ListItem>);
    const wrapperHorizontal = mount(
      <ListItem spacious horizontal>
        Content
      </ListItem>,
    );

    expect(wrapperDefault.debug() === wrapperHorizontal.debug()).toBe(false);
  });
});
