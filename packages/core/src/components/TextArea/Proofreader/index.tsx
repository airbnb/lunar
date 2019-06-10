import React from 'react';
import debounce from 'lodash/debounce';
import BaseTextArea from '../../private/BaseTextArea';
import T from '../../Translate';
import Text from '../../Text';
import Link from '../../Link';
import Loader from '../../Loader';
import Dropdown from '../../Dropdown';
import withStyles, { WithStylesProps } from '../../../composers/withStyles';
import buildInputStyles from '../../../themes/buildInputStyles';
import { LT_LOCALES } from '../../../constants';
import { ARROW_LEFT, ARROW_UP, ARROW_DOWN, ARROW_RIGHT } from '../../../keys';
import Mark from './Mark';
import ErrorMenu from './ErrorMenu';
import LocaleMenu from './LocaleMenu';
import { ProofreadRuleMatch, ProofreaderResponse, DefinitionShape } from './types';
import { Props as FormInputProps } from '../../private/FormInput';

const AIRBNB_REGEX = /\b(((air|ari|iar)[bn]{3})(?!\.com))\b/gi;
const NON_WORD_REGEX = /\W/;

const ARROW_KEYS = [ARROW_LEFT, ARROW_UP, ARROW_DOWN, ARROW_RIGHT];

const NO_LOCALE = 'none';
const AUTO_DETECT_LOCALE = 'auto';
const LOCALE_TO_LT_LOCALE: { [locale: string]: string } = {
  de: 'de-DE',
  en: 'en-US',
  ja: 'ja-JP',
  pt: 'pt-PT',
  ru: 'ru-RU',
  zh: 'zh-CN',
};

export type Position = {
  left: number;
  top: number;
};

export type Props = Pick<FormInputProps, 'important'> & {
  locale?: string;
  name: string;
  id: string;
  noTranslate?: boolean;
  onChange: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCheckText: (params: any) => Promise<ProofreaderResponse>;
  value: string;
};

export type State = {
  errors: ProofreadRuleMatch[];
  loading: boolean;
  position: Position | null;
  selectedError: ProofreadRuleMatch | null;
  selectedLocale: string | null;
  showLocaleMenu: boolean;
  text: string;
  unsupportedLocale: string | null;
};

export type Snapshot = {
  selectionStart?: number;
  selectionEnd?: number;
};

export class Proofreader extends React.Component<Props & WithStylesProps, State, Snapshot> {
  static defaultProps = {
    locale: NO_LOCALE,
  };

  caretRef = React.createRef<HTMLDivElement>();

  controlsRef = React.createRef<HTMLDivElement>();

  shadowRef = React.createRef<HTMLDivElement>();

  textareaRef = React.createRef<HTMLTextAreaElement>();

  inputRaf: number = 0;

  syncScrollRaf: number = 0;

  scrollTimeout: number = 0;

  state: State = {
    errors: [],
    loading: false,
    position: null,
    selectedError: null,
    selectedLocale: null,
    showLocaleMenu: false,
    text: this.props.value,
    unsupportedLocale: null,
  };

  getSnapshotBeforeUpdate() {
    if (!this.textareaRef.current) {
      return null;
    }

    return {
      selectionStart: this.textareaRef.current.selectionStart,
      selectionEnd: this.textareaRef.current.selectionEnd,
    };
  }

  componentDidMount() {
    this.selectAppropriateLocale();
  }

  componentDidUpdate(prevProps: Props, prevState: State, snapshot: Snapshot) {
    const { locale, value } = this.props;

    if (locale !== prevProps.locale) {
      this.selectAppropriateLocale();
    }

    if (value === prevProps.value) {
      // if value hasn't changed but other props have, make sure to retain original cursor position
      this.setCursorPosition(snapshot);
    } else {
      this.setState(
        {
          text: value,
          errors: [],
          selectedError: null,
        },
        () => {
          // reset cursor position to original position after updating value
          this.setCursorPosition(snapshot);
        },
      );

      // Start checking when we encounter a non-word character so we can avoid
      // reporting misspellings for half-typed words.
      if (value.length > 0 && value.slice(-1).match(NON_WORD_REGEX)) {
        this.checkTextDebounced();
      }

      // If the user backspaces and removes a chunk of text, the scroll position
      // and dimensions may be out of sync, so we need to manually update them.
      // Don't use RAF though as it may take too long to render.
      if (value.length < prevProps.value.length) {
        window.setTimeout(this.performSyncScroll, 0);
      }
    }
  }

  componentWillUnmount() {
    if (this.syncScrollRaf) {
      cancelAnimationFrame(this.syncScrollRaf);
    }

    if (this.inputRaf) {
      cancelAnimationFrame(this.inputRaf);
    }
  }

  setCursorPosition(snapshot: Snapshot) {
    if (!snapshot) return;

    const { selectionStart, selectionEnd } = snapshot;
    const textarea = this.textareaRef.current;

    if (textarea && selectionStart && selectionEnd) {
      textarea.setSelectionRange(selectionStart, selectionEnd);
    }
  }

  checkText(): Promise<void> {
    const { text, selectedLocale } = this.state;

    this.setState({
      loading: true,
      position: null,
      selectedError: null,
    });

    // Check for Airbnb misspellings
    const customErrors = this.checkForAirbnbErrors(text);

    if (!text || !selectedLocale || selectedLocale === NO_LOCALE) {
      this.setState({
        errors: [...customErrors],
        loading: false,
      });

      return Promise.resolve();
    }

    // Check with language tool
    const params = {
      text,
      locale: selectedLocale,
      action: 'check',
    };

    return this.props
      .onCheckText(params)
      .then(({ proofread }) => {
        this.setState({
          errors: [...customErrors, ...proofread.matches],
          loading: false,
        });
      })
      .catch(() => {
        // Swallow errors
        this.setState({
          errors: [...customErrors],
          loading: false,
        });
      });
  }

  checkTextAndClearErrors() {
    if (this.state.errors.length > 0) {
      this.setState({
        errors: [],
      });
    }

    this.checkTextDebounced();
  }

  checkTextDebounced = debounce(this.checkText, 2000, {
    leading: true,
  });

  checkForAirbnbErrors(text: string): ProofreadRuleMatch[] {
    const customErrors: ProofreadRuleMatch[] = [];

    if (!text) {
      return customErrors;
    }

    let match = AIRBNB_REGEX.exec(text);

    while (match) {
      if (match[0] !== 'Airbnb') {
        customErrors.push({
          short_message: '',
          message: T.phrase(
            'Improper company spelling or casing',
            {},
            'Error message when Airbnb is used incorrectly',
          ),
          offset: AIRBNB_REGEX.lastIndex - match[0].length,
          length: match[0].length,
          found: match[0],
          replacements: ['Airbnb'],
        });
      }

      match = AIRBNB_REGEX.exec(text);
    }

    return customErrors;
  }

  getLocaleDefinition(locale: string): DefinitionShape {
    if (locale === NO_LOCALE) {
      return {
        locale,
        label: T.phrase(
          'No language selected',
          {},
          'No language selected for spell and grammar checking',
        ),
      };
    }

    if (locale === AUTO_DETECT_LOCALE) {
      return {
        locale,
        label: T.phrase(
          'Auto-detect language',
          {},
          'Auto-detect language for spell and grammar checking',
        ),
      };
    }

    return LT_LOCALES.find(definition => definition.locale === locale)!;
  }

  getCaretOffset(): Position {
    let top = 0;
    let left = 0;

    if (this.caretRef.current) {
      const child = this.caretRef.current.children[1] as HTMLElement;

      top = child.offsetTop;
      left = child.offsetLeft;
    }

    return { top, left };
  }

  selectAppropriateLocale() {
    const { locale: baseLocale } = this.props;
    const locale = LOCALE_TO_LT_LOCALE[baseLocale!] || baseLocale || '';
    const possibleMatches: DefinitionShape[] = [];
    let match: string | null = null;

    if (locale === NO_LOCALE) {
      match = NO_LOCALE;
    } else if (locale === AUTO_DETECT_LOCALE) {
      match = AUTO_DETECT_LOCALE;
    } else {
      LT_LOCALES.some(definition => {
        if (locale === definition.locale) {
          match = definition.locale;

          return true;
        }

        if (locale.length === 2 && definition.locale.indexOf(locale) === 0) {
          possibleMatches.push(definition);
        }

        return false;
      });

      if (!match && possibleMatches.length > 0) {
        match = possibleMatches[0].locale;
      }
    }

    this.setState(
      {
        selectedLocale: match,
        unsupportedLocale: match ? null : locale,
      },
      () => {
        this.checkTextAndClearErrors();
      },
    );
  }

  /**
   * When clicking into a textarea, or moving the cursor around with arrow keys,
   * attempt to detect any current errors at the defined offsets.
   */
  selectErrorAtPosition(position: number) {
    const { errors } = this.state;

    if (errors.length === 0) {
      return;
    }

    const selectedError =
      errors.find(
        error =>
          position >= (error.offset || 0) && position <= (error.offset || 0) + (error.length || 0),
      ) || null;

    this.setState({
      selectedError,
    });
  }

  syncScrollPositions = () => {
    if (!this.syncScrollRaf) {
      this.syncScrollRaf = requestAnimationFrame(this.performSyncScroll);
    }
  };

  performSyncScroll = () => {
    this.syncScrollRaf = 0;

    if (this.shadowRef.current && this.textareaRef.current) {
      const { current: shadow } = this.shadowRef;
      const { current: textarea } = this.textareaRef;

      shadow.style.minHeight = textarea.style.minHeight;
      shadow.style.height = textarea.style.height;
      shadow.scrollTop = textarea.scrollTop;
    }
  };

  private handleTextAreaClick = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    this.selectErrorAtPosition(event.currentTarget.selectionStart);
  };

  private handleTextAreaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (ARROW_KEYS.includes(event.key)) {
      this.selectErrorAtPosition(event.currentTarget.selectionStart);
    }
  };

  /**
   * When a user is typing, we need to capture the offset of the caret within the textarea,
   * and determine when they are typing near the bottom of the container. If so,
   * we need to set the scroll top to max so text doesn't go behind the control bar.
   */
  private handleInput = () => {
    if (!this.inputRaf) {
      this.inputRaf = requestAnimationFrame(this.handleInputScroll);
    }
  };

  private handleInputScroll = () => {
    this.inputRaf = 0;

    if (!this.textareaRef.current || !this.controlsRef.current) {
      return;
    }

    const el = this.textareaRef.current;
    const offset = this.getCaretOffset();
    const scrollBuffer = this.controlsRef.current.offsetHeight + 35;

    // At the bottom
    if (offset.top >= el.scrollHeight - scrollBuffer) {
      el.scrollTop = el.scrollHeight;
      // In the middle of the textarea, below the scroll
    } else if (offset.top >= el.offsetHeight + el.scrollTop - scrollBuffer) {
      el.scrollTop += scrollBuffer;
    }
  };

  /**
   * When a marked/highlighted word is focused, open the error menu with the marks position.
   */
  private handleOpenErrorMenu = (top: number, left: number) => {
    this.setState({
      position: {
        top: top - (this.textareaRef.current ? this.textareaRef.current.scrollTop : 0),
        left,
      },
    });
  };

  /**
   * When a replacement word is clicked within the error menu, replace the current text with the
   * new word at the define error offsets.
   */
  private handleReplaceText = (error: ProofreadRuleMatch, replacement: string) => {
    const { offset = 0 } = error;
    const { errors, text } = this.state;
    let newText = '';

    newText += text.slice(0, offset);
    newText += replacement;
    newText += text.slice(offset + error.length!);

    this.setState(
      {
        text: newText,
        // Filter out this error
        errors: errors.filter(e => e !== error),
        // Close the error menu
        position: null,
        selectedError: null,
      },
      () => {
        // Kick off a non-debounced checkText, as this is coming directly from a replacement:
        this.checkText();

        const newOffset = offset + replacement.length;
        const textarea = this.textareaRef.current;

        if (!textarea) {
          return;
        }

        // Focus the textarea so we can reset the cursor position.
        textarea.focus();
        textarea.setSelectionRange(newOffset, newOffset);

        // Blurring and focusing the textarea will scroll the textarea to the cursor position,
        // which is what we need to do to avoid all our position syncing shenanigans.
        textarea.blur();
        textarea.focus();
      },
    );

    if (this.props.onChange) {
      // We don't have a real event here, so fake one
      const event = {
        nativeEvent: new Event('change'),
        currentTarget: this.textareaRef,
        target: this.textareaRef,
        preventDefault() {},
      };

      this.props.onChange(newText, event as React.ChangeEvent<any>);
    }
  };

  /**
   * Keep shadow scroll position in sync with the textarea.
   */
  private handleScroll = () => {
    this.syncScrollPositions();

    if (this.state.position) {
      this.setState({
        selectedError: null,
        position: null,
      });
    }

    // When the textarea has trailing newlines, the scroll event
    // will not fire when scrolled to the very bottom, so we
    // get into a weird state where the scroll positions don't match.
    // Add a small timeout to fix this issue.
    window.clearTimeout(this.scrollTimeout);

    this.scrollTimeout = window.setTimeout(this.syncScrollPositions, 500);
  };

  private handleSelectLocale = (locale: string) => {
    this.setState(
      {
        selectedLocale: locale,
        showLocaleMenu: false,
      },
      () => {
        this.checkTextAndClearErrors();
      },
    );
  };

  private handleToggleLocaleMenu = () => {
    this.setState(prevState => ({
      showLocaleMenu: !prevState.showLocaleMenu,
    }));
  };

  renderTextWithMarks() {
    const { errors, selectedError, text } = this.state;

    if (errors.length === 0) {
      return text;
    }

    // Sort errors by offset otherwise slicing does not work
    errors.sort((a, b) => (a.offset || 0) - (b.offset || 0));

    const content: NonNullable<React.ReactNode>[] = [];
    let lastIndex = 0;

    errors.forEach(error => {
      const offset = error.offset || 0;
      const length = error.length || 0;

      if (offset > text.length) {
        return;
      }

      // Extract previous string
      content.push(text.slice(lastIndex, offset));

      // Set new last index
      lastIndex = offset + length;

      // Extract match and wrap in a component
      const word = text.slice(offset, lastIndex);

      content.push(
        <Mark
          key={`${word}-${offset}`}
          selected={error === selectedError}
          onSelect={this.handleOpenErrorMenu}
        >
          {word}
        </Mark>,
      );
    });

    // Extract any remaining text
    content.push(text.slice(lastIndex));

    // Add a fake character to the end of the text. This solves a handful of bugs
    // in which trailing new lines in combination with scroll position do not work correctly.
    content.push('.');

    return content;
  }

  render() {
    const { cx, children, styles, onCheckText, theme, important, ...props } = this.props;
    const {
      position,
      errors,
      loading,
      selectedError,
      selectedLocale,
      showLocaleMenu,
      unsupportedLocale,
      text,
    } = this.state;
    const caretPosition =
      (this.textareaRef.current && this.textareaRef.current.selectionStart) || 0;
    const highlightsProps = {
      className: cx(styles.highlights, important && styles.highlights_important),
      ref: this.shadowRef,
    };

    if (this.props.noTranslate) {
      highlightsProps.className += ' notranslate';
    }

    return (
      <div className={cx(styles.proofread)}>
        {/* Shadow text for displaying underlined words. */}
        <div {...highlightsProps}>{this.renderTextWithMarks()}</div>

        {/* Track the top/left offset of the caret within the textarea. */}
        {caretPosition > 0 && (
          <div className={cx(styles.caret)} ref={this.caretRef}>
            <span>{text.slice(0, caretPosition)}</span>
            <span>{text.slice(caretPosition)}.</span>
          </div>
        )}

        <BaseTextArea
          {...props}
          spellCheck={false}
          value={this.state.text}
          onClick={this.handleTextAreaClick}
          onKeyDown={this.handleTextAreaKeyDown}
          onScroll={this.handleScroll}
          onInput={this.handleInput}
          propagateRef={this.textareaRef}
          important={important}
        />

        {position && selectedError && (
          <Dropdown {...position} zIndex={5}>
            <ErrorMenu error={selectedError} onReplaceText={this.handleReplaceText} />
          </Dropdown>
        )}

        <div
          className={cx(styles.controls, important && styles.controls_important)}
          ref={this.controlsRef}
        >
          <span className={cx(styles.cell, { pointerEvents: 'initial' })}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link small onClick={this.handleToggleLocaleMenu}>
              {selectedLocale ? (
                this.getLocaleDefinition(selectedLocale).label
              ) : (
                <T
                  phrase="Unsupported language %{locale}"
                  locale={unsupportedLocale || 'unknown'}
                  context="Language is not supported for spelling detection"
                />
              )}
            </Link>

            {showLocaleMenu && (
              <Dropdown
                visible
                top="80%"
                left={theme!.unit}
                zIndex={5}
                onClickOutside={this.handleToggleLocaleMenu}
              >
                <LocaleMenu
                  // autoDefinition={this.getLocaleDefinition(AUTO_DETECT_LOCALE)}
                  noneDefinition={this.getLocaleDefinition(NO_LOCALE)}
                  selectedLocale={selectedLocale}
                  onSelectLocale={this.handleSelectLocale}
                />
              </Dropdown>
            )}
          </span>

          {errors.length > 0 && (
            <span className={cx(styles.cell)}>
              <Text small muted>
                <T
                  phrase="%{smartCount} issue||||%{smartCount} issues"
                  smartCount={errors.length}
                  context="Showing the number of misspellings in a paragraph of text"
                />
              </Text>
            </span>
          )}

          {loading && (
            <span className={cx(styles.cell)}>
              <Loader inline />
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(
  theme => {
    const { input, input_important: inputImportant } = buildInputStyles(theme);
    const { unit } = theme;

    // Add space for controls
    const inputPadding = unit * 2; // pattern.regularButton horizontal padding
    const paddingBottom = inputPadding + unit * 4;

    const { backgroundColor: colorImportant } = inputImportant;

    return {
      proofread: {
        position: 'relative',
        width: '100%',
        '-webkit-text-size-adjust': 'none',

        '@selectors': {
          '> textarea': {
            display: 'block',
            position: 'relative',
            backgroundColor: 'transparent',
            zIndex: 2,
            paddingBottom,
          },
        },
      },

      highlights: {
        ...input,
        position: 'absolute',
        color: 'transparent',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        zIndex: 1,
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        paddingBottom,
      },

      highlights_important: {
        backgroundColor: colorImportant,
      },

      caret: {
        ...input,
        position: 'absolute',
        visibility: 'hidden',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        overflow: 'hidden',
        zIndex: 0,
      },

      controls: {
        pointerEvents: 'none',
        position: 'absolute',
        display: 'flex',
        alignItems: 'flex-end',
        background: input.backgroundColor,
        padding: `${unit}px ${inputPadding}px`,
        boxShadow: `2px -2px 2px 0px ${theme.color.base}`,
        zIndex: 2,
        bottom: 2,
        left: 2,
        // Do not cover scrollbar or resizer
        right: inputPadding + 2,

        '::after': {
          content: '""',
          display: 'block',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          position: 'absolute',
          background:
            // prettier-ignore
            `linear-gradient(to right, ${theme.color.accent.border}, ${theme.color.base})`,
        },
      },

      controls_important: {
        background: colorImportant,
        boxShadow: `2px -2px 2px 0px ${colorImportant}`,
        '::after': {
          background: `linear-gradient(to right, ${theme.color.accent.border}, ${colorImportant})`,
        },
      },

      cell: {
        display: 'block',
        marginRight: unit * 2,
      },
    };
  },
  {
    passThemeProp: true,
  },
)(Proofreader);
