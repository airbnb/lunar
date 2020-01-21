import React from 'react';
import { render } from 'rut-dom';
import Shortcuts, { ShortcutsProps } from '../../src/components/Shortcuts';
import Menu from '../../src/components/Menu';
import { Selection } from '../../src/components/SelectList';
import Hotkey from '../../src/components/Hotkey';
import { Wrapper } from '../mocks';
import { ShortcutConfig } from '../../src/types';
import { MENU_SHORTCUTS } from '../../src/constants';

describe('<Shortcuts />', () => {
  const shortcuts: ShortcutConfig[] = [
    {
      name: 'macro',
      description: 'Select a prewritten response',
      arguments: [{ name: 'name' }],
      onRun() {},
    },
    {
      name: 'call',
      description: 'Start a call',
      onRun() {},
    },
  ];

  it('renders a menu', () => {
    const { root } = render<ShortcutsProps>(<Shortcuts shortcuts={[]} />, {
      wrapper: <Wrapper menu={MENU_SHORTCUTS} />,
    });

    expect(root.find(Menu, { name: MENU_SHORTCUTS })).toHaveLength(1);
  });

  it('renders a selection item for each shortcut', () => {
    const { root } = render<ShortcutsProps>(<Shortcuts shortcuts={shortcuts} />, {
      wrapper: <Wrapper menu={MENU_SHORTCUTS} />,
    });

    expect(root.find(Selection)).toHaveLength(2);
  });

  it('renders nothing when input field matches 1 shortcut', () => {
    const { root } = render<ShortcutsProps>(<Shortcuts shortcuts={shortcuts} />, {
      wrapper: <Wrapper menu={MENU_SHORTCUTS} value="/macro" />,
    });

    expect(root).not.toHaveRendered();
  });

  it('registers hotkeys', () => {
    const { root } = render<ShortcutsProps>(<Shortcuts shortcuts={[]} />, {
      wrapper: <Wrapper menu={MENU_SHORTCUTS} />,
    });

    expect(root.find(Hotkey)).toHaveLength(4);
  });

  it('registers change and submit handlers', () => {
    const changeSpy = jest.fn();
    const submitSpy = jest.fn();

    render<ShortcutsProps>(<Shortcuts shortcuts={[]} />, {
      wrapper: (
        <Wrapper
          composerContext={{ onChange: changeSpy, onSubmit: submitSpy }}
          menu={MENU_SHORTCUTS}
        />
      ),
    });

    expect(changeSpy).toHaveBeenCalled();
    expect(submitSpy).toHaveBeenCalled();
  });

  it('errors when names collide', () => {
    expect(() => {
      render<ShortcutsProps>(<Shortcuts shortcuts={[...shortcuts, ...shortcuts]} />, {
        wrapper: <Wrapper menu={MENU_SHORTCUTS} />,
      });
    }).toThrow('Shortcut with name "macro" already exists.');
  });

  it('clicking a selection updates the input value', () => {
    const setSpy = jest.fn();

    const { root } = render<ShortcutsProps>(<Shortcuts shortcuts={shortcuts} />, {
      wrapper: <Wrapper composerContext={{ setData: setSpy }} menu={MENU_SHORTCUTS} />,
    });

    root.find('button')[1].dispatch('onClick');

    expect(setSpy).toHaveBeenCalledWith('value', '/macro <name>');
  });
});
