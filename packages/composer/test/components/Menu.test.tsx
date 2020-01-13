import React from 'react';
import { render } from 'rut-dom';
import Dropdown from '@airbnb/lunar/lib/components/Dropdown';
import Menu, { MenuProps } from '../../src/components/Menu';
import { Wrapper } from '../mocks';

describe('<Menu />', () => {
  it('doesnt render if active menu doesnt match', () => {
    const { root } = render<MenuProps>(<Menu name="foo">Content</Menu>, {
      wrapper: <Wrapper menu="bar" />,
    });

    expect(root).not.toHaveRendered();
  });

  it('renders if active menu does match', () => {
    const { root } = render<MenuProps>(<Menu name="foo">Content</Menu>, {
      wrapper: <Wrapper menu="foo" />,
    });

    expect(root).toHaveRendered();
    expect(root).toContainNode('Content');
  });

  it('renders a title if defined', () => {
    const { root } = render<MenuProps>(
      <Menu name="foo" title="Title">
        Content
      </Menu>,
      {
        wrapper: <Wrapper menu="foo" />,
      },
    );

    expect(root).toContainNode('Title');
  });

  it('handles left align', () => {
    const { root } = render<MenuProps>(
      <Menu startAlign name="foo" title="Title">
        Content
      </Menu>,
      {
        wrapper: <Wrapper menu="foo" />,
      },
    );
    const drop = root.findOne(Dropdown.WrappedComponent);

    expect(drop).toHaveProp('left', 4);
    expect(drop).toHaveProp('right', 'auto');
    expect(drop).toHaveProp('bottom', 'calc(100% + 8px)');
  });

  it('handles right align', () => {
    const { root } = render<MenuProps>(
      <Menu endAlign name="foo" title="Title">
        Content
      </Menu>,
      {
        wrapper: <Wrapper menu="foo" />,
      },
    );
    const drop = root.findOne(Dropdown.WrappedComponent);

    expect(drop).toHaveProp('left', 'auto');
    expect(drop).toHaveProp('right', 4);
    expect(drop).toHaveProp('bottom', 'calc(100% + 8px)');
  });

  it('handles center align', () => {
    const { root } = render<MenuProps>(
      <Menu centerAlign name="foo" title="Title">
        Content
      </Menu>,
      {
        wrapper: (
          <Wrapper
            composerContext={{ flags: { beforeButton: true, afterButton: true } }}
            menu="foo"
          />
        ),
      },
    );

    const drop = root.findOne(Dropdown.WrappedComponent);

    expect(drop).toHaveProp('left', 32);
    expect(drop).toHaveProp('right', 32);
    expect(drop).toHaveProp('bottom', 'calc(100% + 8px)');
  });
});
