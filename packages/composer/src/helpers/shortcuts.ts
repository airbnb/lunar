import T from '@airbnb/lunar/lib/components/Translate';
import { MENU_SHORTCUTS } from '../constants';
import {
  ShortcutArgument,
  ShortcutConfig,
  WritableContext,
  ReadableContext,
  DataSet,
} from '../types';

export function formatArguments(args: ShortcutArgument[]): string {
  return args.map(arg => (arg.optional ? `[${arg.name}]` : `<${arg.name}>`)).join(' ');
}

export function formatConfigIntoCommand(shortcut: Required<ShortcutConfig>): string {
  let cmd = `/${shortcut.name}`;

  if (shortcut.arguments.length > 0) {
    cmd += ' ';
    cmd += formatArguments(shortcut.arguments);
  }

  return cmd;
}

export function filterAndSortShortcuts(
  shortcuts: ShortcutConfig[],
  enteredName: string,
): Required<ShortcutConfig>[] {
  const usedNames = new Set();
  const filteredShortcuts: Required<ShortcutConfig>[] = shortcuts.map(config => {
    if (usedNames.has(config.name)) {
      throw new Error(
        T.phrase(
          'lunar.composer.shortcuts.nameExists',
          'Shortcut with name "%{name}" already exists.',
          { name: config.name },
        ),
      );
    } else {
      usedNames.add(config.name);
    }

    return {
      arguments: [],
      ...config,
    };
  });

  // Sort by name A-Z
  filteredShortcuts.sort((a, b) => a.name.localeCompare(b.name));

  // Filter by name entered in input
  return filteredShortcuts.filter(a => a.name.startsWith(enteredName));
}

export function isShortcutCommand(value?: string): boolean {
  return !!value && (value === '/' || !!value.match(/^\/\w+/i));
}

export function activeWhenShortcutsMenuOpen(context: ReadableContext): boolean {
  return (
    !!context.data.focused &&
    context.menu === MENU_SHORTCUTS &&
    isShortcutCommand(context.data.value)
  );
}

export function openShortcutsMenu({ setMenu }: WritableContext) {
  setMenu(MENU_SHORTCUTS);
}

/**
 * When the user starts typing a shortcut starting with "/",
 * we should open the shortcuts menu.
 */
export function onChangeToggleShortcutsMenu(nextValue: string, { setMenu }: WritableContext) {
  const isShortcut = isShortcutCommand(nextValue);

  if (isShortcut) {
    setMenu(MENU_SHORTCUTS);
  } else if (nextValue.startsWith('/') && !isShortcut) {
    setMenu('');
  }
}

/**
 * When the input field is submitted, we need to check if the value
 * is a shortcut command, and if so, execute the handler with args
 * while running validation checks.
 *
 * If it was a shortcut, return `true` so subsequent handlers
 * are not ran.
 */
export function onSubmitExecuteShortcut(
  { value }: DataSet,
  context: WritableContext,
  shortcuts: ShortcutConfig[],
): boolean {
  if (!isShortcutCommand(value)) {
    return false;
  }

  // Remove slash and split into command and arguments
  const [name, ...params] = value.slice(1).split(' ');
  const shortcut = shortcuts.find(sc => sc.name === name);

  // Validate shortcut
  if (!shortcut) {
    throw new Error(
      T.phrase('lunar.composer.shortcuts.invalidName', 'Invalid shortcut "%{name}".', { name }),
    );
  }

  const args = shortcut.arguments ?? [];

  if (params.length > args.length) {
    throw new Error(
      T.phrase('lunar.composer.shortcuts.tooManyArgs', 'Too many shortcut arguments provided.'),
    );
  }

  // Validate arguments
  args.forEach((arg, index) => {
    const param = params[index];

    if ((!arg.optional && !param) || param === `[${arg.name}]` || param === `<${arg.name}>`) {
      throw new Error(
        T.phrase(
          'lunar.composer.shortcuts.argRequired',
          'Shortcut argument "%{name}" is required.',
          { name: arg.name },
        ),
      );
    }

    if (arg.validator) {
      arg.validator(param);
    }
  });

  // Everything is good, so execute handler
  shortcut.onRun(context, ...params);

  // Clear the input
  context.setData('value', '');

  return true;
}
