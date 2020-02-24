import React from 'react';
import { MENU_SHORTCUTS } from '../constants';
import { HotkeyComparator, HotkeyConfig, ReadableContext, WritableContext } from '../types';

export const SYMBOLS: { [key: string]: string } = {
  cmd: '⌘',
  command: '⌘',
  ctrl: 'ctrl',
  control: 'ctrl',
  alt: 'alt',
  opt: '⌥',
  option: '⌥',
  shift: '↑',
  enter: '↲',
  return: '↲',
  tab: 'tab',
  up: '∧',
  down: '∨',
  left: '<',
  right: '>',
};

export function parseComboIntoComparator(hotkey: string): HotkeyComparator {
  const comp: HotkeyComparator = {};

  hotkey
    .toLowerCase()
    .replace(/\s/g, '')
    .split('+')
    .forEach(key => {
      // istanbul ignore next
      switch (key) {
        case 'cmd':
        case 'command':
          comp.metaKey = true;
          break;
        case 'ctrl':
        case 'control':
          comp.ctrlKey = true;
          break;
        case 'alt':
        case 'opt':
        case 'option':
          comp.altKey = true;
          break;
        case 'shift':
          comp.shiftKey = true;
          break;
        case 'enter':
        case 'return':
          comp.key = 'Enter';
          break;
        case 'esc':
          comp.key = 'Escape';
          break;
        case 'tab':
          comp.key = 'Tab';
          break;
        case 'up':
          comp.key = 'ArrowUp';
          break;
        case 'down':
          comp.key = 'ArrowDown';
          break;
        case 'left':
          comp.key = 'ArrowLeft';
          break;
        case 'right':
          comp.key = 'ArrowRight';
          break;
        default:
          comp.key = key;
          break;
      }
    });

  return comp;
}

export function processHotkeys(
  hotkeys: Map<string, HotkeyConfig>,
  event: React.SyntheticEvent<HTMLTextAreaElement>,
  readableContext: ReadableContext,
  writableContext: WritableContext,
) {
  // Hotkeys should never bubble up the document
  event.stopPropagation();

  hotkeys.forEach(hotkey => {
    if (!hotkey.condition(readableContext)) {
      return;
    }

    const passed = Object.entries(hotkey.comparator).every(
      ([key, value]) => event[key as keyof React.SyntheticEvent] === value,
    );

    if (passed) {
      if (hotkey.preventDefault) {
        event.preventDefault();
      }

      hotkey.onRun(writableContext);
    }
  });
}

export function showWhenNoMenuCondition(context: ReadableContext): boolean {
  return context.menu === '';
}

export function showWhenNoMenuOrValueCondition(context: ReadableContext): boolean {
  return context.menu === '' && context.data.value === '';
}

export function showWhenValueNotEmptyCondition(context: ReadableContext): boolean {
  return !!context.data.focused && context.data.value !== '';
}

export function closeMenu({ menu, setData, setMenu }: WritableContext) {
  setMenu('');

  if (menu === MENU_SHORTCUTS) {
    setData('value', '');
  }
}

export function activeWhenMenuOpen(context: ReadableContext): boolean {
  return !!context.data.focused && !!context.menu;
}
