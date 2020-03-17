import React from 'react';
import debounce from 'lodash/debounce';
import BaseTextArea from '../private/BaseTextArea';
import Dropdown from '../Dropdown';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { NO_LOCALE, NON_WORD_REGEX, ARROW_KEYS } from './constants';
import Renderer from './Renderer';
import ErrorMenu from './ErrorMenu';
import ControlBar from './ControlBar';
import {
  ProofreadRuleMatch,
  ProofreaderResponse,
  ExtraProofreadProps,
  ProofreaderParams,
} from './types';
import { FormInputProps } from '../private/FormInput';
import { styleSheet } from './styles';
import { selectAppropriateLocale, checkForAirbnbErrors } from './helpers';

function defaultIsRuleHighlighted(rule: ProofreadRuleMatch) {
  return false;
}

function defaultIsRuleSecondary(rule: ProofreadRuleMatch) {
  return false;
}

export type Position = {
  left: number;
  top: number;
};

export type ProofreaderProps = Pick<FormInputProps, 'important' | 'noTranslate'> &
  ExtraProofreadProps & {
    id: string;
    locale?: string;
    name: string;
    onChange: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onCheckText: (params: ProofreaderParams) => Promise<ProofreaderResponse>;
    value: string;
  };

export type ProofreaderState = {
  errors: ProofreadRuleMatch[];
  loading: boolean;
  position: Position | null;
  selectedError: ProofreadRuleMatch | null;
  selectedLocale: string | null;
  text: string;
};

export type Snapshot = {
  selectionStart?: number;
  selectionEnd?: number;
};

export class Proofreader extends React.Component<
  ProofreaderProps & WithStylesProps,
  ProofreaderState,
  Snapshot
> {
  static defaultProps = {
    isRuleHighlighted: defaultIsRuleHighlighted,
    isRuleSecondary: defaultIsRuleSecondary,
    locale: NO_LOCALE,
    value: '',
  };

  caretRef = React.createRef<HTMLDivElement>();

  controlsRef = React.createRef<HTMLDivElement>();

  shadowRef = React.createRef<HTMLDivElement>();

  textareaRef = React.createRef<HTMLTextAreaElement>();

  inputRaf: number = 0;

  syncScrollRaf: number = 0;

  scrollTimeout: number = 0;

  state: ProofreaderState = {
    errors: [],
    loading: false,
    position: null,
    selectedError: null,
    selectedLocale: null,
    text: this.props.value,
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

  componentDidUpdate(prevProps: ProofreaderProps, prevState: ProofreaderState, snapshot: Snapshot) {
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
    const customErrors = checkForAirbnbErrors(text);

    if (!text || !selectedLocale || selectedLocale === NO_LOCALE) {
      this.setState({
        errors: [...customErrors],
        loading: false,
      });

      return Promise.resolve();
    }

    // Check with language tool
    const params: ProofreaderParams = {
      text,
      locale: selectedLocale,
      action: 'check',
    };

    return this.props
      .onCheckText(params)
      .then(({ proofread }: ProofreaderResponse) => {
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
    this.setState(
      {
        selectedLocale: selectAppropriateLocale(this.props.locale).selectedLocale,
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
          position >= (error.offset ?? 0) && position <= (error.offset ?? 0) + (error.length ?? 0),
      ) ?? null;

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
  private handleOpenErrorMenu = (error: ProofreadRuleMatch, top: number, left: number) => {
    this.setState({
      selectedError: error,
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

      this.props.onChange(
        newText,
        // @ts-ignore
        event,
      );
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
      },
      () => {
        this.checkTextAndClearErrors();
      },
    );
  };

  render() {
    const {
      children,
      cx,
      important,
      isRuleHighlighted,
      isRuleSecondary,
      localeMenuMaxHeight,
      onChange,
      onCheckText,
      styles,
      theme,
      ...props
    } = this.props;
    const { position, errors, loading, selectedError, selectedLocale, text } = this.state;
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
        <div {...highlightsProps}>
          <Renderer
            shadow
            value={text}
            errors={errors}
            selectedError={selectedError}
            isRuleHighlighted={isRuleHighlighted}
            isRuleSecondary={isRuleSecondary}
            onSelectError={this.handleOpenErrorMenu}
          />
        </div>

        {/* Track the top/left offset of the caret within the textarea. */}
        {caretPosition > 0 && text && (
          <div ref={this.caretRef} className={cx(styles.caret)}>
            <span>{text.slice(0, caretPosition)}</span>
            <span>{text.slice(caretPosition)}.</span>
          </div>
        )}

        <BaseTextArea
          {...props}
          spellCheck={false}
          value={this.state.text}
          propagateRef={this.textareaRef}
          important={important}
          onChange={onChange}
          onClick={this.handleTextAreaClick}
          onKeyDown={this.handleTextAreaKeyDown}
          onScroll={this.handleScroll}
          onInput={this.handleInput}
        />

        {position && selectedError && (
          <Dropdown {...position} zIndex={5}>
            <ErrorMenu error={selectedError} onReplaceText={this.handleReplaceText} />
          </Dropdown>
        )}

        <div
          ref={this.controlsRef}
          className={cx(styles.controls, important && styles.controls_important)}
        >
          <ControlBar
            loading={loading}
            locale={selectedLocale!}
            localeMenuMaxHeight={localeMenuMaxHeight}
            errors={errors}
            onSelectLocale={this.handleSelectLocale}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styleSheet, {
  passThemeProp: true,
})(Proofreader);
