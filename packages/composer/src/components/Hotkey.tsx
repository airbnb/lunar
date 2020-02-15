import { useEffect, useContext } from 'react';
import { parseComboIntoComparator } from '../helpers/hotkeys';
import HotkeyContext from '../contexts/HotkeyContext';
import { HotkeyConfig } from '../types';

export type HotkeyProps = Omit<HotkeyConfig, 'comparator'>;

export default function Hotkey({
  combo,
  condition,
  label,
  name,
  onRun,
  order = 10,
  preventDefault = false,
}: HotkeyProps) {
  const { addHotkey, removeHotkey } = useContext(HotkeyContext);

  useEffect(() => {
    const hotkey = {
      combo,
      comparator: parseComboIntoComparator(combo),
      condition,
      label,
      name,
      onRun,
      order,
      preventDefault,
    };

    // Add on mount or update
    addHotkey(name, hotkey);

    // Remove on unmount
    return () => {
      removeHotkey(name);
    };
  }, [addHotkey, removeHotkey, combo, condition, label, name, onRun, order, preventDefault]);

  return null;
}
