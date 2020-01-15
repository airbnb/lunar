import Composer from './components/Composer';
import Actions, { ActionButton } from './components/Actions';
import Emojis, { EmojiButton } from './components/Emojis';
import Hotkey from './components/Hotkey';
import Preview from './components/Preview';
import Shortcuts from './components/Shortcuts';
import Suggestions from './components/Suggestions';
// So consumers can build their own stuff
import Menu, { ToggleButton } from './components/Menu';
import SelectList, { Selection } from './components/SelectList';

export {
  Actions,
  ActionButton,
  Emojis,
  EmojiButton,
  Hotkey,
  Menu,
  Preview,
  SelectList,
  Selection,
  Shortcuts,
  Suggestions,
  ToggleButton,
};

export * from './types';

export default Composer;
