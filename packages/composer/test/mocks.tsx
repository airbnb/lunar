import React from 'react';
import ComposerContext, { defaultContext } from '../src/contexts/ComposerContext';
import HotkeyContext, { Context as HotkeyContextType } from '../src/contexts/HotkeyContext';
import { HotkeyConfig, Context as ComposerContextType, ReadableContext } from '../src/types';

export type WrapperProps = {
  children?: React.ReactNode;
  composerContext?: Partial<ComposerContextType>;
  hotkeys?: HotkeyConfig[];
  hotkeyContext?: Partial<HotkeyContextType>;
  value?: string;
} & Partial<ReadableContext>;

export function Wrapper({
  children,
  composerContext,
  hotkeys = [],
  hotkeyContext,
  menu = '',
  value = '',
}: WrapperProps) {
  const map: [string, HotkeyConfig][] = [];

  hotkeys.forEach(hotkey => {
    map.push([hotkey.name, hotkey]);
  });

  return (
    <ComposerContext.Provider
      value={{
        ...defaultContext,
        data: { shadowValue: '', value },
        menu,
        id: 'composer',
        ...composerContext,
      }}
    >
      <HotkeyContext.Provider
        value={{ hotkeys: new Map(map), addHotkey() {}, removeHotkey() {}, ...hotkeyContext }}
      >
        {children}
      </HotkeyContext.Provider>
    </ComposerContext.Provider>
  );
}
