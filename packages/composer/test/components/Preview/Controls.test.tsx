import React from 'react';
import { render } from 'rut-dom';
import Link from '@airbnb/lunar/lib/components/Link';
import Loader from '@airbnb/lunar/lib/components/Loader';
import Dropdown from '@airbnb/lunar/lib/components/Dropdown';
import T from '@airbnb/lunar/lib/components/Translate';
import LocaleMenu from '@airbnb/lunar/lib/components/TextArea/Proofreader/LocaleMenu';
import Controls, { ControlsProps } from '../../../src/components/Preview/Controls';

describe('<Controls />', () => {
  const props: ControlsProps = {
    errors: [],
    onSelectLocale() {},
  };

  it('toggles locale menu open and closed', () => {
    const { root } = render<ControlsProps>(<Controls {...props} />);

    expect(root.find(Dropdown.WrappedComponent)).toHaveLength(0);

    root.findOne('button').dispatch('onClick');

    expect(root.find(Dropdown.WrappedComponent)).toHaveLength(1);
  });

  it('selects locale when clicking an item', () => {
    const spy = jest.fn();
    const { root } = render<ControlsProps>(<Controls {...props} onSelectLocale={spy} />);

    // Open menu
    root.findOne('button').dispatch('onClick');

    // Click locale item
    root.findAt('button', 13, { role: 'menuitem' }).dispatch('onClick');

    expect(spy).toHaveBeenCalledWith('it');
    expect(root.find(Dropdown.WrappedComponent)).toHaveLength(0);
  });

  it('sets locale label', () => {
    const { root, update } = render<ControlsProps>(<Controls {...props} />);

    expect(root.findAt(Link.WrappedComponent, 'first')).toContainNode('English (United States)');

    update({ locale: 'ja-JP' });

    expect(root.findAt(Link.WrappedComponent, 'first')).toContainNode('日本語');
  });

  it('shows error count when list is non-empty', () => {
    const { root, update } = render<ControlsProps>(<Controls {...props} />);
    const k = 'composer.proofreader.totalIssues';

    expect(root.find(T, { k })).toHaveLength(0);

    update({
      errors: [{ message: 'Misspelling' }],
    });

    expect(root.find(T, { k })).toHaveLength(1);
    expect(root.findOne(T, { k })).toHaveProp('smartCount', 1);
  });

  it('shows loader when loading', () => {
    const { root, update } = render<ControlsProps>(<Controls {...props} />);

    expect(root.find(Loader)).toHaveLength(0);

    update({
      loading: true,
    });

    expect(root.find(Loader)).toHaveLength(1);
  });

  it('handles unknown locale', () => {
    const { root } = render<ControlsProps>(<Controls {...props} locale="foo" />);

    expect(root.find(T, { k: 'composer.proofreader.unsupportedLanguage' })).toHaveLength(1);
  });

  it('handles no locale', () => {
    const { root } = render<ControlsProps>(<Controls {...props} locale="none" />);

    expect(root).toContainNode('No language selected');
  });

  it('handles auto locale', () => {
    const { root } = render<ControlsProps>(<Controls {...props} locale="auto" />);

    expect(root).toContainNode('Auto-detect language');
  });

  it('handles territory locale fallbacks', () => {
    // Locale is actually pt-PT
    const { root } = render<ControlsProps>(<Controls {...props} locale="pt" />);

    expect(root).toContainNode('Português (Portugal)');
  });

  it('supports auto-detect locale', () => {
    const { root } = render<ControlsProps>(<Controls {...props} autoDetect />);

    // Open menu
    root.findOne('button').dispatch('onClick');

    expect(root.findOne(LocaleMenu)).toHaveProp(
      'autoDefinition',
      expect.objectContaining({
        locale: 'auto',
      }),
    );
  });
});
