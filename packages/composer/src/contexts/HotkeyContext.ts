import React from 'react';
import { HotkeyConfig } from '../types';

export type Context = {
  hotkeys: Map<string, HotkeyConfig>;
  addHotkey: (name: string, hotkey: HotkeyConfig) => void;
  removeHotkey: (name: string) => void;
};

export const defaultContext: Context = {
  hotkeys: new Map(),
  addHotkey() {},
  removeHotkey() {},
};

export default React.createContext<Context>(defaultContext);
