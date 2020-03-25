/* eslint-disable unicorn/consistent-function-scoping */

import React from 'react';
import { render, renderAndWait, DomElement, mockFetch } from 'rut-dom';
import Interweave from '@airbnb/lunar/lib/components/Interweave';
import ErrorMenu from '@airbnb/lunar/lib/components/Proofreader/ErrorMenu';
import Mark from '@airbnb/lunar/lib/components/Proofreader/Mark';
import Composer, { ComposerProps } from '../../src/components/Composer';
import Hotkey from '../../src/components/Hotkey';
import Shortcuts from '../../src/components/Shortcuts';
import { Selection } from '../../src/components/SelectList';
// @ts-ignore Our build deletes story.d.ts files
import { actions, shortcuts, loadSuggestions, checkText } from '../../src/Composer.story';
import Menu from '../../src/components/Menu';
import Actions, { ActionButton } from '../../src/components/Actions';
import Emojis, { EmojiButton } from '../../src/components/Emojis';
import Preview from '../../src/components/Preview';
import Suggestions from '../../src/components/Suggestions';
import { MENU_ACTIONS, MENU_EMOJIS, MENU_PREVIEW } from '../../src/constants';
import Proofreader from '../../src/components/Preview/Proofreader';
import Window from '../../src/components/Preview/Window';
import { ShortcutConfig } from '../../src';

jest.mock('lodash/debounce', () => (cb: Function) => {
  return (...args: unknown[]) => cb(...args);
});

describe('<Composer />', () => {
  const props = {
    onChange() {},
    onSubmit() {},
  };

  beforeEach(() => {
    process.env.INTERWEAVE_ALLOW_FETCH_EMOJI = 'true';

    mockFetch('*', [
      {
        annotation: 'grinning face',
        emoji: '😀',
        group: 0,
        hexcode: '1F600',
        name: 'GRINNING FACE',
        order: 1,
        shortcodes: ['gleeful'],
        subgroup: 0,
        tags: ['face', 'grin'],
        type: 1,
        version: 1,
      },
    ]);

    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('renders', () => {
    const { root } = render<ComposerProps>(<Composer {...props} />);

    expect(root).toHaveRendered();
  });

  it('renders a `beforeButton`', () => {
    const node = <EmojiButton />;
    const { root } = render<ComposerProps>(<Composer {...props} beforeButton={node} />);

    expect(root).toContainNode(node);
  });

  it('renders an `afterButton`', () => {
    const node = <EmojiButton />;
    const { root } = render<ComposerProps>(<Composer {...props} afterButton={node} />);

    expect(root).toContainNode(node);
  });

  it('propagates a ref', () => {
    const spy = jest.fn();

    render<ComposerProps>(<Composer {...props} propagateRef={spy} />, {
      mockRef() {
        return { tagName: 'textarea', style: {} };
      },
    });

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'textarea' }));
  });

  describe('states', () => {
    it('marks invalid if `onChange` throws an error', () => {
      const { root } = render<ComposerProps>(
        <Composer
          {...props}
          onChange={() => {
            throw new Error('Oops');
          }}
        />,
      );

      root.findOne('textarea').dispatch('onChange');

      expect(root).toContainNode('Oops');
    });

    it('marks invalid if `onSubmit` throws an error', () => {
      const { root } = render<ComposerProps>(
        <Composer
          {...props}
          onSubmit={() => {
            throw new Error('Oops');
          }}
        />,
      );

      // Add a value so its not blocked
      root.findOne('textarea').dispatch('onChange', { target: { value: 'foo' } });

      // Submit the form
      root.findOne('button').dispatch('onClick');

      expect(root).toContainNode('Oops');
    });
  });

  describe('hotkeys', () => {
    it('executes a custom hotkey', () => {
      const spy = jest.fn();
      const { root } = render<ComposerProps>(
        <Composer {...props}>
          <Hotkey name="foo" combo="shift+enter" condition={() => true} onRun={spy} />
        </Composer>,
      );

      root.findOne('textarea').dispatch('onKeyDown', { key: 'Enter', shiftKey: true });

      expect(spy).toHaveBeenCalledWith(expect.anything());
    });
  });

  describe('actions', () => {
    function openActionMenu(root: DomElement<React.ComponentType<ComposerProps>>) {
      root.findOne('button', { id: 'toggle-button-actions' }).dispatch('onClick');
    }

    it('opens actions menu when toggle button is clicked', () => {
      const { root } = render<ComposerProps>(
        <Composer {...props} afterButton={<ActionButton />}>
          <Actions actions={actions} />
        </Composer>,
      );

      expect(root.findOne(Menu, { name: MENU_ACTIONS })).not.toHaveRendered();

      openActionMenu(root);

      expect(root.findOne(Menu, { name: MENU_ACTIONS })).toHaveRendered();

      openActionMenu(root);

      expect(root.findOne(Menu, { name: MENU_ACTIONS })).not.toHaveRendered();
    });
  });

  describe('emojis', () => {
    async function openEmojiMenu(root: DomElement<React.ComponentType<ComposerProps>>) {
      await root.findOne('button', { id: 'toggle-button-emojis' }).dispatchAndWait('onClick');
    }

    it('opens emojis menu when toggle button is clicked', async () => {
      const { root } = await renderAndWait<ComposerProps>(
        <Composer {...props} afterButton={<EmojiButton />}>
          <Emojis />
        </Composer>,
      );

      expect(root.findOne(Menu, { name: MENU_EMOJIS })).not.toHaveRendered();

      await openEmojiMenu(root);

      expect(root.findOne(Menu, { name: MENU_EMOJIS })).toHaveRendered();

      await openEmojiMenu(root);

      expect(root.findOne(Menu, { name: MENU_EMOJIS })).not.toHaveRendered();
    });

    it('selects emoji when clicked', async () => {
      const { root } = await renderAndWait<ComposerProps>(
        <Composer {...props} afterButton={<EmojiButton />}>
          <Emojis />
        </Composer>,
      );

      await openEmojiMenu(root);

      expect(root.findOne('textarea')).toHaveValue('');

      root.findOne('button', { className: 'emoji' }).dispatch('onClick');

      expect(root.findOne('textarea')).toHaveValue(' 😀');
    });
  });

  describe('previews', () => {
    async function openPreviewMenu(
      root: DomElement<React.ComponentType<ComposerProps>>,
      value: string,
    ) {
      await root.findOne('textarea').dispatchAndWait('onChange', { target: { value } });

      await root.findOne('button', { id: 'composer-submit-button' }).dispatchAndWait('onClick');
    }

    function mockRef(element: React.ReactElement) {
      if (element.type === 'mark') {
        return { offsetTop: 5, offsetRight: 10, offsetLeft: 15, offsetHeight: 100 };
      }

      return undefined;
    }

    it('opens preview menu when form is submitted and does not submit entirely', async () => {
      const spy = jest.fn();
      const { root } = render<ComposerProps>(
        <Composer {...props} onSubmit={spy}>
          <Preview requireConfirmation />
        </Composer>,
      );

      expect(root.findOne(Menu, { name: MENU_PREVIEW })).not.toHaveRendered();

      await openPreviewMenu(root, 'Hello');

      expect(root.findOne(Menu, { name: MENU_PREVIEW })).toHaveRendered();
      expect(root.findOne(Menu, { name: MENU_PREVIEW }).findOne(Interweave)).toHaveProp(
        'content',
        'Hello',
      );
      expect(spy).not.toHaveBeenCalled();
    });

    it('renders a proofreader when `onProofread` is passed', async () => {
      const { root } = render<ComposerProps>(
        <Composer {...props}>
          <Preview requireConfirmation onProofread={checkText} />
        </Composer>,
      );

      expect(root.find(Proofreader)).toHaveLength(0);

      await openPreviewMenu(root, 'Hello');

      expect(root.find(Proofreader)).toHaveLength(1);
    });

    it('renders error marks and shows error menu when clicked', async () => {
      const { root } = render<ComposerProps>(
        <Composer {...props}>
          <Preview requireConfirmation onProofread={checkText} />
        </Composer>,
        { mockRef },
      );
      const value =
        'Click the colored phrases for details on potential errors. or use this text too see an few of of the problems that Oxford can detecd.';

      // Show preview
      await openPreviewMenu(root, value);

      const marks = root.find(Mark);

      expect(marks).toHaveLength(5);
      expect(root.find(ErrorMenu)).toHaveLength(0);

      // Open error menu
      marks[0].findOne('button').dispatch('onClick');

      expect(root.find(ErrorMenu)).toHaveLength(1);

      // Replace error with new text
      await root
        .findOne(ErrorMenu)
        .findAt('button', 'first', { role: 'menuitem' })
        .dispatchAndWait('onClick');

      expect(root.findOne('textarea')).not.toHaveValue(value);
    });

    it('submits the form once the preview has been confirmed', async () => {
      const spy = jest.fn();
      const { root } = render<ComposerProps>(
        <Composer {...props} onSubmit={spy}>
          <Preview requireConfirmation />
        </Composer>,
      );

      // Show preview
      await openPreviewMenu(root, 'Hello');

      const docSpy = jest.spyOn(document, 'getElementById').mockImplementation(
        // @ts-ignore Allow mock
        () => ({
          click() {
            root.findOne('button', { id: 'composer-submit-button' }).dispatch('onClick');
          },
          focus() {},
        }),
      );

      // Confirm preview and submit
      await root.findOne(Window).findOne('button').dispatchAndWait('onClick');

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          previewConfirmed: true,
          shadowValue: '',
          value: 'Hello',
        }),
        expect.any(Object),
      );

      docSpy.mockRestore();
    });
  });

  describe('shortcuts', () => {
    it('opens shortcuts menu when "/" is typed and closes when cleared', () => {
      const { root } = render<ComposerProps>(
        <Composer {...props}>
          <Shortcuts shortcuts={shortcuts} />
        </Composer>,
      );

      expect(root.findOne(Menu)).not.toHaveRendered();

      root.findOne('textarea').dispatch('onKeyDown', { key: '/' });

      expect(root.findOne(Menu)).toHaveRendered();

      root.findOne('textarea').dispatch('onChange', { target: { value: '' } });

      expect(root.findOne(Menu)).not.toHaveRendered();
    });

    it('closes menu when "esc" is pressed', () => {
      const { root } = render<ComposerProps>(
        <Composer {...props}>
          <Shortcuts shortcuts={shortcuts} />
        </Composer>,
      );

      root.findOne('textarea').dispatch('onChange', { target: { value: '/' } });
      root.findOne('textarea').dispatch('onFocus');

      expect(root.findOne(Menu)).toHaveRendered();

      root.findOne('textarea').dispatch('onKeyDown', { key: 'Escape' });

      expect(root.findOne(Menu)).not.toHaveRendered();
    });

    it('can cycle through and select an item in the list', () => {
      const { root } = render<ComposerProps>(
        <Composer {...props}>
          <Shortcuts shortcuts={shortcuts} />
        </Composer>,
      );

      // Open menu
      root.findOne('textarea').dispatch('onChange', { target: { value: '/' } });
      root.findOne('textarea').dispatch('onFocus');

      // Check first is active
      const a = root.findAt(Selection, 0);

      expect(a).toHaveProp('active', true);
      expect(root.findAt(Selection, 1)).toHaveProp('active', false);

      // Trigger a down cycle
      root.findOne('textarea').dispatch('onKeyDown', { key: 'ArrowDown' });

      // Check second is active
      expect(root.findAt(Selection, 0)).toHaveProp('active', false);
      expect(root.findAt(Selection, 1)).toHaveProp('active', true);

      // Trigger an up cycle
      root.findOne('textarea').dispatch('onKeyDown', { key: 'ArrowUp' });

      // Check first is active again
      expect(root.findAt(Selection, 0)).toHaveProp('active', true);
      expect(root.findAt(Selection, 1)).toHaveProp('active', false);

      // Trigger a select
      root.findOne('textarea').dispatch('onKeyDown', { key: 'Tab' });

      // Check input has been updated
      expect(root.findOne('textarea')).toHaveValue('/call');
    });

    describe('submitting', () => {
      function openAndSubmit(root: DomElement<React.ComponentType<ComposerProps>>, value: string) {
        const textarea = root.findOne('textarea');

        // Open menu
        textarea.dispatch('onKeyDown', { key: '/' });

        // Enter a shortcut
        textarea.dispatch('onChange', { target: { value } });

        // Submit
        root.findOne('button').dispatch('onClick');
      }

      it('executes shortcut when input is submitted', () => {
        const cuts = (shortcuts as ShortcutConfig[]).map((cut) => ({ ...cut, onRun: jest.fn() }));
        const { root } = render<ComposerProps>(
          <Composer {...props}>
            <Shortcuts shortcuts={cuts} />
          </Composer>,
        );

        openAndSubmit(root, '/cancel 123');

        // Verify it was called
        expect(cuts[3].onRun).toHaveBeenCalledWith(expect.anything(), '123');
      });

      it('clears input field when submitted', () => {
        const { root } = render<ComposerProps>(
          <Composer {...props}>
            <Shortcuts shortcuts={shortcuts} />
          </Composer>,
        );

        openAndSubmit(root, '/cancel 123');

        expect(root.findOne('textarea')).toHaveValue('');
      });

      it('errors for invalid/unknown shortcut', () => {
        const { root } = render<ComposerProps>(
          <Composer {...props}>
            <Shortcuts shortcuts={shortcuts} />
          </Composer>,
        );

        openAndSubmit(root, '/whatisthis');

        // Marks as invalid
        expect(root).toContainNode('Invalid shortcut "whatisthis".');
      });

      it('errors if required argument not defined', () => {
        const { root } = render<ComposerProps>(
          <Composer {...props}>
            <Shortcuts shortcuts={shortcuts} />
          </Composer>,
        );

        openAndSubmit(root, '/cancel');

        // Marks as invalid
        expect(root).toContainNode('Shortcut argument "code" is required.');
      });

      it('errors if too many arguments', () => {
        const { root } = render<ComposerProps>(
          <Composer {...props}>
            <Shortcuts shortcuts={shortcuts} />
          </Composer>,
        );

        openAndSubmit(root, '/macro foo bar baz');

        // Marks as invalid
        expect(root).toContainNode('Too many shortcut arguments provided.');
      });

      it('triggers argument validation on submit', () => {
        const { root } = render<ComposerProps>(
          <Composer {...props}>
            <Shortcuts shortcuts={shortcuts} />
          </Composer>,
        );

        openAndSubmit(root, '/cancel foo');

        // Marks as invalid
        expect(root).toContainNode('Code must be a number!');
      });
    });
  });

  describe('suggestions', () => {
    async function typeAhead(
      root: DomElement<React.ComponentType<ComposerProps>>,
      value: string,
      match: string,
    ) {
      const textarea = root.findOne('textarea');

      // Change value and await the request
      await textarea.dispatchAndWait('onChange', { target: { value } });

      // Change value again to trigger the shadow
      await textarea.dispatchAndWait('onChange', { target: { value: `${value} ` } });

      expect(root.findOne(Interweave)).toHaveProp('content', match);
      expect(textarea).toHaveValue(`${value} `);
    }

    beforeEach(() => {
      sessionStorage.clear();
    });

    it('selects shadow when a suggestion matches and tab is pressed', async () => {
      const { root } = render<ComposerProps>(
        <Composer {...props}>
          <Suggestions onLoad={loadSuggestions} />
        </Composer>,
      );

      const textarea = root.findOne('textarea');

      await typeAhead(root, 'Hello', 'Hello there General Kenobi!');

      // Select the shadow text
      textarea.dispatch('onKeyDown', { key: 'Tab' });

      expect(root.findOne(Interweave)).toHaveProp('content', '');
      expect(textarea).toHaveValue('Hello there General Kenobi!');
    });

    it('changes shadow based on whats typed', async () => {
      const { root } = render<ComposerProps>(
        <Composer {...props}>
          <Suggestions onLoad={loadSuggestions} />
        </Composer>,
      );

      const textarea = root.findOne('textarea');

      await typeAhead(root, 'He', 'Hello, world!');

      await typeAhead(root, 'Hell', 'Hell nah!');

      await typeAhead(root, 'Hello', 'Hello there General Kenobi!');

      // Set value to empty for code coverage
      root.findOne('textarea').dispatch('onChange', { target: { value: '' } });

      expect(root.findOne(Interweave)).toHaveProp('content', '');
      expect(textarea).toHaveValue('');
    });

    // eslint-disable-next-line jest/expect-expect
    it('matches when the phrase comes after a deliminiter', async () => {
      const { root } = render<ComposerProps>(
        <Composer {...props}>
          <Suggestions onLoad={loadSuggestions} />
        </Composer>,
      );

      await typeAhead(
        root,
        'This is another sentence that comes before the phrase. Hello',
        'This is another sentence that comes before the phrase. Hello there General Kenobi!',
      );
    });
  });
});
