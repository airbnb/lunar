import React from 'react';
import { HotkeyConfig } from '../types';

export type Context = {
  addHotkey: (name: string, hotkey: HotkeyConfig) => void;
  hotkeys: Map<string, HotkeyConfig>;
  removeHotkey: (name: string) => void;
  setVisible: (state: boolean) => void;
  visible: boolean;
};

export const defaultContext: Context = {
  addHotkey() {},
  hotkeys: new Map(),
  removeHotkey() {},
  setVisible() {},
  visible: false,
};

export default React.createContext<Context>(defaultContext);
