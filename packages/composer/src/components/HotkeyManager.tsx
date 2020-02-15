import React, { useCallback, useReducer } from 'react';
import HotkeyContext from '../contexts/HotkeyContext';
import { HotkeyConfig } from '../types';

export type HotkeyManagerProps = {
  children: NonNullable<React.ReactNode>;
};

export type HotkeyAction =
  | {
      type: 'add';
      name: string;
      hotkey: HotkeyConfig;
    }
  | {
      type: 'remove';
      name: string;
    };

function reducer(state: Map<string, HotkeyConfig>, action: HotkeyAction) {
  const nextState = new Map(state);

  switch (action.type) {
    case 'add':
      nextState.set(action.name, action.hotkey);
      break;
    case 'remove':
      nextState.delete(action.name);
      break;
    // istanbul ignore next
    default:
      throw new Error('Unknown hotkey action.');
  }

  return nextState;
}

export default function HotkeyManager({ children }: HotkeyManagerProps) {
  const [hotkeys, processHotkey] = useReducer(reducer, new Map());

  const addHotkey = useCallback(
    (name: string, hotkey: HotkeyConfig) => {
      processHotkey({ type: 'add', name, hotkey });
    },
    [processHotkey],
  );

  const removeHotkey = useCallback(
    (name: string) => {
      processHotkey({ type: 'remove', name });
    },
    [processHotkey],
  );

  return (
    <HotkeyContext.Provider value={{ hotkeys, addHotkey, removeHotkey }}>
      {children}
    </HotkeyContext.Provider>
  );
}
