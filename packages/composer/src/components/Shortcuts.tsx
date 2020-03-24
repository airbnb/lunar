import React, { useCallback, useContext, useState, useEffect } from 'react';
import T from '@airbnb/lunar/lib/components/Translate';
import Menu from './Menu';
import SelectList, { Selection } from './SelectList';
import ComposerContext from '../contexts/ComposerContext';
import {
  filterAndSortShortcuts,
  formatArguments,
  formatConfigIntoCommand,
  onSubmitExecuteShortcut,
  onChangeToggleShortcutsMenu,
  openShortcutsMenu,
  activeWhenShortcutsMenuOpen,
} from '../helpers/shortcuts';
import { showWhenNoMenuOrValueCondition } from '../helpers/hotkeys';
import Hotkey from './Hotkey';
import { MENU_SHORTCUTS } from '../constants';
import { ShortcutConfig, SubmitHandler, WritableContext } from '../types';

export type ShortcutsProps = {
  /** List of shortcut commands to support. */
  shortcuts: ShortcutConfig[];
};

export default function Shortcuts({ shortcuts }: ShortcutsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const context = useContext(ComposerContext);
  const inputName = context.data.value.slice(1).split(' ')[0];
  const filteredShortcuts = filterAndSortShortcuts(shortcuts, inputName);

  // Handlers
  const handleSubmit = useCallback<SubmitHandler>(
    (result, ctx) => onSubmitExecuteShortcut(result, ctx, shortcuts),
    [shortcuts],
  );

  const moveUp = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? filteredShortcuts.length - 1 : i - 1));
  }, [filteredShortcuts]);

  const moveDown = useCallback(() => {
    setActiveIndex((i) => (i >= filteredShortcuts.length - 1 ? 0 : i + 1));
  }, [filteredShortcuts]);

  const selectShortcut = useCallback(
    ({ setMenu: setActiveMenu, setData }: WritableContext) => {
      setActiveMenu('');
      setData('value', formatConfigIntoCommand(filteredShortcuts[activeIndex]));
    },
    [filteredShortcuts, activeIndex],
  );

  // Enable feature
  context.flags.shortcuts = true;

  useEffect(() => {
    context.onChange(onChangeToggleShortcutsMenu);
    context.onSubmit(handleSubmit);
  }, [context, handleSubmit]);

  // If only 1 shortcut, then we have an exact match and can hide the menu
  if (filteredShortcuts.length === 1 && filteredShortcuts[0].name === inputName) {
    return null;
  }

  // Index outside range of what's filtered, reset back to 0
  if (
    filteredShortcuts.length > 0 &&
    (activeIndex >= filteredShortcuts.length || activeIndex < 0)
  ) {
    setActiveIndex(0);
  }

  return (
    <>
      <Hotkey
        combo="/"
        condition={showWhenNoMenuOrValueCondition}
        name="openShortcutMenu"
        label={T.phrase('lunar.composer.shortcuts.hotkey.toOpen', 'to shortcuts')}
        onRun={openShortcutsMenu}
      />

      <Hotkey
        preventDefault
        combo="up"
        condition={activeWhenShortcutsMenuOpen}
        name="moveUpShortcutMenu"
        label={T.phrase('lunar.composer.shortcuts.hotkey.moveUp', 'up')}
        onRun={moveUp}
      />

      <Hotkey
        preventDefault
        combo="down"
        condition={activeWhenShortcutsMenuOpen}
        name="moveDownShortcutMenu"
        label={T.phrase('lunar.composer.shortcuts.hotkey.moveDown', 'down')}
        onRun={moveDown}
      />

      <Hotkey
        preventDefault
        combo="tab"
        condition={activeWhenShortcutsMenuOpen}
        name="selectShortcut"
        label={T.phrase('lunar.composer.shortcuts.hotkey.toSelect', 'to select')}
        onRun={selectShortcut}
      />

      <Menu
        centerAlign
        name={MENU_SHORTCUTS}
        title={<T k="lunar.composer.shortcuts.title" phrase="Shortcuts" />}
      >
        <SelectList
          noResults={
            <T
              k="lunar.composer.shortcuts.noResults"
              phrase="No shortcuts found for %{name}."
              name={inputName}
            />
          }
        >
          {filteredShortcuts.map((shortcut, i) => (
            <Selection
              key={shortcut.name}
              active={i === activeIndex}
              description={shortcut.description}
              name={`/${shortcut.name}`}
              status={formatArguments(shortcut.arguments)}
              onClick={() => {
                context.setData('value', formatConfigIntoCommand(shortcut));
              }}
            />
          ))}
        </SelectList>
      </Menu>
    </>
  );
}
