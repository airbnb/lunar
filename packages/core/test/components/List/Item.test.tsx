import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import ListItem from '../../../src/components/List/Item';

describe('<ListItem />', () => {
  it('errors if no children', () => {
    expect(() => {
      // @ts-ignore
      shallowWithStyles(<ListItem />);
    }).toThrowError();
  });

  it('renders a <li /> by default', () => {
    const wrapper = shallowWithStyles(<ListItem>Content</ListItem>);
    expect(wrapper.type()).toEqual('li');
  });

  it('renders bordered', () => {
    const wrapperDefault = shallowWithStyles(<ListItem>Content</ListItem>);
    const wrapperBordered = shallowWithStyles(<ListItem bordered>Content</ListItem>);

    expect(wrapperDefault.html() === wrapperBordered.html()).toBe(false);
  });

  it('renders compact', () => {
    const wrapperDefault = shallowWithStyles(<ListItem>Content</ListItem>);
    const wrapperCompact = shallowWithStyles(<ListItem compact>Content</ListItem>);

    expect(wrapperDefault.html() === wrapperCompact.html()).toBe(false);
  });

  it('renders spacious', () => {
    const wrapperDefault = shallowWithStyles(<ListItem>Content</ListItem>);
    const wrapperSpacious = shallowWithStyles(<ListItem spacious>Content</ListItem>);

    expect(wrapperDefault.html() === wrapperSpacious.html()).toBe(false);
  });

  it('renders horizontal + bordered', () => {
    const wrapperDefault = shallowWithStyles(<ListItem bordered>Content</ListItem>);
    const wrapperHorizontal = shallowWithStyles(
      <ListItem bordered horizontal>
        Content
      </ListItem>,
    );

    expect(wrapperDefault.html() === wrapperHorizontal.html()).toBe(false);
  });

  it('renders horizontal + compact', () => {
    const wrapperDefault = shallowWithStyles(<ListItem compact>Content</ListItem>);
    const wrapperHorizontal = shallowWithStyles(
      <ListItem compact horizontal>
        Content
      </ListItem>,
    );

    expect(wrapperDefault.html() === wrapperHorizontal.html()).toBe(false);
  });

  it('renders horizontal + spacious', () => {
    const wrapperDefault = shallowWithStyles(<ListItem spacious>Content</ListItem>);
    const wrapperHorizontal = shallowWithStyles(
      <ListItem spacious horizontal>
        Content
      </ListItem>,
    );

    expect(wrapperDefault.html() === wrapperHorizontal.html()).toBe(false);
  });
});
