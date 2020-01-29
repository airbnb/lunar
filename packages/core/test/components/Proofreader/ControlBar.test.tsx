import React from 'react';
import { render } from 'rut-dom';
import Link from '../../../src/components/Link';
import Loader from '../../../src/components/Loader';
import Dropdown from '../../../src/components/Dropdown';
import T from '../../../src/components/Translate';
import LocaleMenu from '../../../src/components/Proofreader/LocaleMenu';
import ControlBar, { ControlBarProps } from '../../../src/components/Proofreader/ControlBar';

describe('<ControlBar />', () => {
  const props: ControlBarProps = {
    errors: [],
    onSelectLocale() {},
  };

  it('toggles locale menu open and closed', () => {
    const { root } = render<ControlBarProps>(<ControlBar {...props} />);

    expect(root.find(Dropdown.WrappedComponent)).toHaveLength(0);

    root.findOne('button').dispatch('onClick');

    expect(root.find(Dropdown.WrappedComponent)).toHaveLength(1);
  });

  it('selects locale when clicking an item', () => {
    const spy = jest.fn();
    const { root } = render<ControlBarProps>(<ControlBar {...props} onSelectLocale={spy} />);

    // Open menu
    root.findOne('button').dispatch('onClick');

    // Click locale item
    root.findAt('button', 13, { role: 'menuitem' }).dispatch('onClick');

    expect(spy).toHaveBeenCalledWith('it');
    expect(root.find(Dropdown.WrappedComponent)).toHaveLength(0);
  });

  it('sets locale label', () => {
    const { root, update } = render<ControlBarProps>(<ControlBar {...props} />);

    expect(root.findAt(Link.WrappedComponent, 'first')).toContainNode('English (United States)');

    update({ locale: 'ja-JP' });

    expect(root.findAt(Link.WrappedComponent, 'first')).toContainNode('日本語');
  });

  it('shows error count when list is non-empty', () => {
    const { root, update } = render<ControlBarProps>(<ControlBar {...props} />);
    const k = 'lunar.proofreader.totalIssues';

    expect(root.find(T, { k })).toHaveLength(0);

    update({
      errors: [{ message: 'Misspelling' }],
    });

    expect(root.find(T, { k })).toHaveLength(1);
    expect(root.findOne(T, { k })).toHaveProp('smartCount', 1);
  });

  it('shows loader when loading', () => {
    const { root, update } = render<ControlBarProps>(<ControlBar {...props} />);

    expect(root.find(Loader)).toHaveLength(0);

    update({
      loading: true,
    });

    expect(root.find(Loader)).toHaveLength(1);
  });

  it('handles unknown locale', () => {
    const { root } = render<ControlBarProps>(<ControlBar {...props} locale="foo" />);

    expect(root.find(T, { k: 'lunar.proofreader.unsupportedLanguage' })).toHaveLength(1);
  });

  it('handles no locale', () => {
    const { root } = render<ControlBarProps>(<ControlBar {...props} locale="none" />);

    expect(root).toContainNode('No language selected');
  });

  it('handles auto locale', () => {
    const { root } = render<ControlBarProps>(<ControlBar {...props} locale="auto" />);

    expect(root).toContainNode('Auto-detect language');
  });

  it('handles territory locale fallbacks', () => {
    // Locale is actually pt-PT
    const { root } = render<ControlBarProps>(<ControlBar {...props} locale="pt" />);

    expect(root).toContainNode('Português (Portugal)');
  });

  it('supports auto-detect locale', () => {
    const { root } = render<ControlBarProps>(<ControlBar {...props} autoDetect />);

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
