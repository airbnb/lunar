import React from 'react';
import { render } from 'rut-dom';
import Hotkey, { HotkeyProps } from '../../src/components/Hotkey';
import { Wrapper } from '../mocks';

describe('<Hotkey />', () => {
  it('registers hotkey on mount', () => {
    const spy = jest.fn();

    render<HotkeyProps>(
      <Hotkey name="foo" combo="shift+enter" condition={() => true} onRun={() => {}} />,
      {
        wrapper: <Wrapper hotkeyContext={{ addHotkey: spy }} />,
      },
    );

    expect(spy).toHaveBeenCalledWith(
      'foo',
      expect.objectContaining({
        combo: 'shift+enter',
        comparator: { key: 'Enter', shiftKey: true },
        name: 'foo',
        order: 10,
        preventDefault: false,
      }),
    );
  });

  it('unregisters hotkey on unmount', () => {
    const spy = jest.fn();
    const { unmount } = render<HotkeyProps>(
      <Hotkey name="foo" combo="shift+enter" condition={() => true} onRun={() => {}} />,
      {
        wrapper: <Wrapper hotkeyContext={{ removeHotkey: spy }} />,
      },
    );

    unmount();

    expect(spy).toHaveBeenCalledWith('foo');
  });
});
