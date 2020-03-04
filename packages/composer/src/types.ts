import React from 'react';
import { WithIconWrapperProps } from '@airbnb/lunar-icons/lib/withIcon';
import {
  ProofreadRuleMatch,
  ProofreaderParams,
} from '@airbnb/lunar/lib/components/Proofreader/types';

export type WritingMode = 'message' | 'email' | 'private-note';

export type DataValue = boolean | string;

export type DataSet = {
  [name: string]: DataValue | undefined;
  emailSubject?: string;
  emailTo?: string;
  focused?: boolean;
  previewConfirmed?: boolean;
  shadowValue: string;
  value: string;
};

export type Context = {
  changeHandlers: Set<ChangeHandler>;
  data: DataSet;
  flags: { [flag: string]: boolean };
  id: string;
  menu: string;
  mode: WritingMode;
  onChange: (...handler: ChangeHandler[]) => void;
  onSubmit: (...handlers: SubmitHandler[]) => void;
  setData: (name: string, value: DataValue | ((prevVaue: DataValue) => DataValue)) => void;
  setError: (value: React.SetStateAction<string>) => void;
  setMenu: (value: React.SetStateAction<string>) => void;
  setMode: (value: React.SetStateAction<WritingMode>) => void;
  submitHandlers: Set<SubmitHandler>;
};

export type ReadableContext = Readonly<Pick<Context, 'data' | 'id' | 'menu' | 'mode'>>;

export type WritableContext = ReadableContext &
  Readonly<Pick<Context, 'setData' | 'setError' | 'setMenu' | 'setMode'>>;

export type ActionHandler = (context: WritableContext, ...args: string[]) => void;

export type ActionConfig = {
  /** Function that determines whether the action is currently shown. */
  condition?: (context: ReadableContext) => boolean;
  /** Organize the action into a group by label. */
  group: string;
  /** Icon component reference. */
  icon: React.ComponentType<WithIconWrapperProps>;
  /** Name of the action. */
  label: string;
  /** Callback ran when the action is executed. */
  onRun: ActionHandler;
};

export type GroupedActions = { [group: string]: ActionConfig[] };

export type ChangeHandler = (nextValue: string, context: WritableContext) => void;

export type SubmitHandler = (result: DataSet, context: WritableContext) => boolean | void;

export type HotkeyComparator = {
  altKey?: boolean;
  ctrlKey?: boolean;
  key?: string;
  metaKey?: boolean;
  shiftKey?: boolean;
};

export type HotkeyConfig = {
  /** Combination of characters that should trigger the hotkey. Separate each character with a `+`. */
  combo: string;
  /** @internal */
  comparator: HotkeyComparator;
  /** Function that determines whether the hotkey is currently active. */
  condition: (context: ReadableContext) => boolean;
  /** Custom label to place near the hotkey in the footer. */
  label?: string;
  /** The name of the hotkey (in camel case). The name must be unique, otherwise an error is thrown. */
  name: string;
  /** Callback that is executed when the combination matches the currently pressed keys. */
  onRun: (context: WritableContext) => void;
  /** Order to display the hotkeys in the footer. */
  order?: number;
  /** Trigger prevent default on the event. */
  preventDefault?: boolean;
};

export type ProofreadConfig = ProofreadRuleMatch;

export type ProofreaderLoader = (params: ProofreaderParams) => Promise<ProofreadConfig[]>;

export type ShortcutArgument = {
  name: string;
  optional?: boolean;
  validator?: (value: string) => void;
};

export type ShortcutHandler = (context: WritableContext, ...args: string[]) => void;

export type ShortcutConfig = {
  /** List of arguments the shortcut requires. Will be passed to the `onRun` handler. */
  arguments?: ShortcutArgument[];
  /** Quick description of the shortcut. */
  description: string;
  /** The name of the shortcut (in camel case). The name must be unique, otherwise an error is thrown. */
  name: string;
  /** Callback that is executed when the entered shortcut is submitted. */
  onRun: ShortcutHandler;
};

export type SuggestionConfig = {
  // Includes the phrase as a prefix
  suggestion: string;
  probability?: number;
};

export type SuggestionLoader = (phrase: string) => Promise<SuggestionConfig[]>;
