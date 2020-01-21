# Lunar Composer

A unified and featureful input field for composing messages.

## Contexts

A context is an object that is passed to specific handlers, allowing consumers to hook into the life
cycle of the composer.

### `ReadableContext`

- `menu` (`string`) - The currently active/open menu.
- `shadowValue` (`string`) - Shadow text displayed behind the input field.
- `value` (`string`) - Value currently entered in the input field.

### `WritableContext`

- Includes all properties from `ReadableContext`.
- `setError` (`(error: string) => void`) - Mark the composer as invalid and set an error message.
- `setMenu` (`(menu: string) => void`) - Open a new menu by name and close all previous menus.
- `setShadowValue` (`(value: string) => void`) - Set the shadow text to be displayed behind the
  input field.
- `setValue` (`(value: string) => void`) - Update the value in the input field.

## Actions

The actions menu provides a mechanism for custom actions to be implemented through manual
interaction. Features like file uploading or markdown controls can be listed here. Furthermore, the
action menu provides a concept of writing modes, where the input field changes based on the current
mode. The following modes are built in and cannot be customized.

- Message - A normal message, like a comment or reply.
- Email - An email message, which includes subject and to fields.
- Private - A private message.

To enable the actions menu, render the `Actions` component within the composer, and render the
`ActionButton` component in the `beforeButton` prop.

```tsx
import Composer, { Actions, ActionButton } from '@airbnb/lunar-composer';

<Composer afterButton={<ActionButton />} onChange={onChange} onSubmit={onSubmit}>
  <Actions />
</Composer>;
```

### Props

- `actions` - List of actions to support.
  - `condition` (`(context: ReadableContext) => boolean`) - Function that determines whether the
    action is currently shown. _(Optional)_
  - `group` (`string`) - Organize the action into a group by label.
  - `icon` (`React.ComponentType<WithIconWrapperProps>`) - Icon component reference.
  - `label` (`string`) - Name of the action.
  - `onRun` (`ActionHandler`) - Callback ran when the action is executed.
- `endAlign` (`boolean`) - Align on the right instead of the left. _(Optional)_
- `noWritingModes` (`boolean`) - Disable the automatic inclusion of writing mode actions.
  _(Optional)_

## Emojis

What kind of composer would this be without emojis??? A terrible one! To enable the emoji picker,
render the `Emojis` component within the composer, and render the `EmojiButton` component in the
`afterButton` prop (if you want the toggle button).

```tsx
import Composer, { Emojis, EmojiButton } from '@airbnb/lunar-composer';

<Composer afterButton={<EmojiButton />} onChange={onChange} onSubmit={onSubmit}>
  <Emojis />
</Composer>;
```

### Props

- `internal` (`boolean`) - Enable internal communication, like agent-to-agent instead of
  agent-to-public. Otherwise, a restricted list of emojis is available. Defaults to `false`.
- `startAlign` (`boolean`) - Render the emoji picker on the left instead of the right. Be sure to
  move the `EmojiButton` to `beforeButton`. Defaults to `false`.

## Hotkeys

A hotkey is a combination of keyboard characters that can be pressed in unison to execute a specific
action. Hotkeys active within the current context will be displayed in the footer below the input
field.

To define a custom hotkey, render the `Hotkey` component within the composer. For example, if
`shift` and `p` are pressed together, the hotkey below will run and will attempt to print the
current document.

```tsx
import Composer, { Hotkey } from '@airbnb/lunar-composer';

<Composer onChange={onChange} onSubmit={onSubmit}>
  <Hotkey
    name="print"
    label="to print"
    combo="shift+p"
    condition={() => true}
    onRun={printDocument}
  />
</Composer>;
```

### Props

- `combo` (`string`) - Combination of characters that should trigger the hotkey. Separate each
  character with a `+`.
- `condition` (`(context: ReadableContext) => boolean`) - Function that determines whether the
  hotkey is currently active.
- `label` (`string`) - Custom label to place near the hotkey in the footer. _(Optional)_
- `name` (`string`) - The name of the hotkey (in camel case). The name must be unique, otherwise an
  error is thrown.
- `onRun` (`(context: WritableContext) => void`) - Handler that is executed when the combination
  matches the currently pressed keys. Is passed the [WritableContext](#writablecontext).
- `order` (`number`) - Order to display the hotkeys in the footer. _(Optional)_
- `preventDefault` (`boolean`) - Trigger prevent default on the event. Defaults to `false`.
  _(Optional)_

> Be sure `onRun` is bound or memoized correctly, using `useCallback()` or something similar,
> otherwise you may hit performance and re-rendering issues.

## Preview

The preview layer permits the user to preview the entered input, outside of the input, before
submission. Perfect for double checking the message before submitting. To enable, render the
`Preview` component within the composer.

```tsx
import Composer, { Preview } from '@airbnb/lunar-composer';

<Composer onChange={onChange} onSubmit={onSubmit}>
  <Preview />
</Composer>;
```

### Props

- `requireConfirmation` (`boolean`) - Require manual confirmation before submitting. Will override
  the built-in submit hotkeys.

## Proofreading

Proofreading is an additional layer on preview (mentioned previously) that checks for spelling and
grammar mistakes, based on [LanguageTool](https://languagetool.org/). Works in a similar fashion to
our `Proofreader` component for `TextArea`.

To enable, define an `onProofread` loader, which fetches checks from an API. Must return a promise,
that returns an array of matches.

```tsx
import Composer, { Preview, ProofreaderParams } from '@airbnb/lunar-composer';

function checkText({ text, locale, action }: ProofreaderParams) {
  return fetchFromLanguageToolLikeApi();
}

<Composer onChange={onChange} onSubmit={onSubmit}>
  <Preview onProofread={checkText} />
</Composer>;
```

### Props

- `isRuleHighlighted` (`(rule) => boolean`) - Determines whether a marked mistake is highlighted.
- `isRuleSecondary`(`(rule) => boolean`) - Determines whether a marked mistake uses a secondary
  color.
- `locale` (`string`) - Locale to query mistakes for. Defaults to "en".
- `onProofread` (`ProofreaderLoader`) - Callback to load spelling and grammar checks from a
  LanguageTool API.

## Shortcuts

A shortcut is a command that starts with a forward slash, supports optional arguments, and is
executed when the input is submitted. To enable shortcuts, render the `Shortcuts` component within
the composer, with an array of `shortcuts`.

```tsx
import Composer, { Shortcuts } from '@airbnb/lunar-composer';

<Composer onChange={onChange} onSubmit={onSubmit}>
  <Shortcuts
    shortcuts={[
      {
        name: 'macro',
        description: 'Select a prewritten response',
        arguments: [{ name: 'name' }],
        onRun: addMacroToInput,
      },
    ]}
  />
</Composer>;
```

### Config

A shortcut supports the following properties.

- `name` (`string`) - The name of the shortcut _without_ the leading forward slash (in camel case).
  The name must be unique, otherwise an error is thrown.
- `description` (`string`) - A single sentence description of the shortcut.
- `arguments` - List of arguments that are passed to the `onRun` function. _(Optional)_
  - `name` (`string`) - Name of the argument (in camel case).
  - `optional` (`boolean`) - Whether the argument is optional or required. If required and not
    provided, will throw an error. Defaults to `false`. _(Optional)_
  - `validator` (`(arg: string) => void`) - Function to validate the entered argument. If invalid,
    throw an error. _(Optional)_
- `onRun` (`(context: WritableContext, ...args: string[]) => void`) - Handler that is executed when
  the input field is submitted with a valid shortcut. Is passed the
  [WritableContext](#writablecontext) and entered arguments.

## Suggestions

A suggestion is a form of type ahead that is displayed as shadow text behind the input field, and
can be used to complete a sentence by hitting `tab`. Suggestions are loaded from an endpoint, using
a phrase that consists of the last few entered words, and must return an array of suggestions.

To enable suggestions, render the `Suggestions` component within the composer, and define an
`onLoad` prop that returns a suggestion list promise.

```tsx
import Composer, { Suggestions } from '@airbnb/lunar-composer';

<Composer onChange={onChange} onSubmit={onSubmit}>
  <Suggestions onLoad={loadSuggestionsFromEndpoint} />
</Composer>;
```

### Props

- `noCache` (`boolean`) - Disable caching of loaded suggestions into session storage. Defaults to
  `false`.
- `onLoad` (`(phrase: string) => Promise<{ suggestion: string, probability?: number }[]>`) -
  Callback fired to load type head suggestions.
- `throttle` (`number`) - Time in milliseconds to debounce each load. Defaults to 200.
