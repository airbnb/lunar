import React from 'react';
import Enzyme from 'enzyme';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Proofreader, {
  Props,
  State,
  Proofreader as BaseProofreader,
} from '../../../src/components/TextArea/Proofreader';
import T from '../../../src/components/Translate';
import ErrorMenu from '../../../src/components/TextArea/Proofreader/ErrorMenu';
import LocaleMenu from '../../../src/components/TextArea/Proofreader/LocaleMenu';
import Mark, { Props as MarkProps } from '../../../src/components/TextArea/Proofreader/Mark';
import SecondaryMark from '../../../src/components/TextArea/Proofreader/SecondaryMark';
import Loader from '../../../src/components/Loader';
import Link from '../../../src/components/Link';
import BaseTextArea from '../../../src/components/private/BaseTextArea';
import { ProofreadRuleMatch } from '../../../src/components/TextArea/Proofreader/types';

// eslint-disable-next-line unicorn/consistent-function-scoping
jest.mock('lodash/debounce', () => (value: unknown) => value);

function getInstance(wrapper: Enzyme.ShallowWrapper<Props, State>): BaseProofreader {
  return wrapper.instance() as BaseProofreader;
}

describe('<Proofreader />', () => {
  let props: Props;
  let wrapper: Enzyme.ShallowWrapper<Props, State>;
  let instance: BaseProofreader;

  const error: ProofreadRuleMatch = {
    message: 'Possible typo',
    short_message: 'Typo',
    offset: 10,
    length: 6,
    replacements: ['foo'],
    rule_id: 'MORFOLOGIK_RULE_EN_US',
  };

  beforeEach(() => {
    jest.useFakeTimers();

    props = {
      id: 'proof',
      name: 'foo',
      onChange: jest.fn(),
      onCheckText: jest.fn(() => Promise.resolve({ proofread: { matches: [] } })),
      locale: 'ja',
      value: '',
    };

    wrapper = shallowWithStyles(<Proofreader {...props} />);
    instance = getInstance(wrapper);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('sets correct locale on mount', () => {
    expect(wrapper.state('selectedLocale')).toBe('ja-JP');
  });

  it('sets unsupported locale on mount', () => {
    wrapper = shallowWithStyles(<Proofreader {...props} locale="foo" />);

    expect(wrapper.state('selectedLocale')).toBeNull();
    expect(wrapper.state('unsupportedLocale')).toBe('foo');
  });

  it('supports noTranslate', () => {
    wrapper = shallowWithStyles(<Proofreader {...props} noTranslate />);

    expect(wrapper.find('div.notranslate')).toHaveLength(1);
    expect(wrapper.find(BaseTextArea).prop('noTranslate')).toBe(true);
  });

  it('updates text state if value prop changes', () => {
    wrapper = shallowWithStyles(<Proofreader {...props} value="foo" />);

    expect(wrapper.state('text')).toBe('foo');

    wrapper.setProps({
      value: 'bar',
    });

    expect(wrapper.state('text')).toBe('bar');
  });

  it('does not error if value is undefined', () => {
    // @ts-ignore
    wrapper = shallowWithStyles(<Proofreader {...props} value={undefined} />);

    expect(wrapper.state('text')).toBe('');

    wrapper.setProps({
      value: 'bar',
    });

    expect(wrapper.state('text')).toBe('bar');
  });

  it('updates text state and checks new text if it ends with a non-word', () => {
    wrapper.setProps({
      value: 'Hello',
    });

    expect(wrapper.state('text')).toBe('Hello');
    expect(props.onCheckText).not.toHaveBeenCalled();

    // Trailing space
    wrapper.setProps({
      value: 'Hello ',
    });

    expect(wrapper.state('text')).toBe('Hello ');
    expect(props.onCheckText).toHaveBeenCalledWith({
      action: 'check',
      locale: 'ja-JP',
      text: 'Hello ',
    });

    // Punctuation
    wrapper.setProps({
      value: 'Hello?',
    });

    expect(wrapper.state('text')).toBe('Hello?');
    expect(props.onCheckText).toHaveBeenCalledWith({
      action: 'check',
      locale: 'ja-JP',
      text: 'Hello?',
    });
  });

  it('updates locale after mount', () => {
    expect(wrapper.state('selectedLocale')).toBe('ja-JP');

    wrapper.setProps({
      locale: 'en',
    });

    expect(wrapper.state('selectedLocale')).toBe('en-US');
  });

  it('checks for errors on mount if value is not empty', () => {
    wrapper = shallowWithStyles(<Proofreader {...props} value="Hello" />);
    wrapper.instance().componentDidMount!();

    expect(props.onCheckText).toHaveBeenCalledWith({
      action: 'check',
      locale: 'ja-JP',
      text: 'Hello',
    });
  });

  it('shows a loader if request is loading', () => {
    expect(wrapper.find(Loader)).toHaveLength(0);

    wrapper.setState({
      loading: true,
    });

    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it('shows error count', () => {
    expect(wrapper.find(T)).toHaveLength(0);

    wrapper.setState({
      errors: [error],
    });

    expect(wrapper.find(T)).toHaveLength(1);
    expect(wrapper.find(T).prop('smartCount')).toBe(1);
  });

  it('shows dropdown if error and position are set', () => {
    expect(wrapper.find(ErrorMenu)).toHaveLength(0);

    wrapper.setState({
      selectedError: error,
      position: { top: 0, left: 0 },
    });

    expect(wrapper.find(ErrorMenu)).toHaveLength(1);
    expect(wrapper.find(ErrorMenu).prop('error')).toBe(error);
  });

  it('shows unsupported locale message', () => {
    wrapper = shallowWithStyles(<Proofreader {...props} locale="ko" />);

    wrapper.setState({
      selectedLocale: null,
      unsupportedLocale: 'foo',
    });

    expect(wrapper.find(T)).toHaveLength(1);
    expect(wrapper.find(T).prop('phrase')).toBe('Unsupported language %{locale}');
    expect(wrapper.find(T).prop('locale')).toBe('foo');
  });

  it('resets error state if value is empty', () => {
    wrapper = shallowWithStyles(<Proofreader {...props} value="Hello" />);

    wrapper.setState({
      errors: [error],
      selectedError: null,
    });

    wrapper.setProps({
      value: '',
    });

    expect(wrapper.state('errors')).toEqual([]);
    expect(wrapper.state('selectedError')).toBeNull();
  });

  it('plumbs the important prop through to BaseTextArea', () => {
    wrapper = shallowWithStyles(<Proofreader {...props} important />);

    expect(wrapper.find(BaseTextArea).prop('important')).toBeTruthy();
  });

  describe('checkText()', () => {
    it('sets matches', async () => {
      wrapper = shallowWithStyles(
        <Proofreader
          {...props}
          onCheckText={() => Promise.resolve({ proofread: { matches: [error] } })}
        />,
      );

      wrapper.setState({
        text: 'foo',
      });

      await getInstance(wrapper).checkText();

      expect(wrapper.state('errors')).toEqual([error]);
    });

    it('does nothing for an unsupported locale', async () => {
      wrapper = shallowWithStyles(<Proofreader {...props} locale="ko" />);

      await getInstance(wrapper).checkText();

      expect(wrapper.state('errors')).toEqual([]);
      expect(props.onCheckText).not.toHaveBeenCalled();
    });

    it('does nothing for a none locale', async () => {
      wrapper = shallowWithStyles(<Proofreader {...props} locale="none" />);

      await getInstance(wrapper).checkText();

      expect(wrapper.state('errors')).toEqual([]);
      expect(props.onCheckText).not.toHaveBeenCalled();
    });
  });

  describe('checkForAirbnbErrors()', () => {
    it('doesnt error for normal casing', () => {
      expect(instance.checkForAirbnbErrors('Something Airbnb something.')).toEqual([]);
    });

    it('doesnt include URLs', () => {
      expect(instance.checkForAirbnbErrors('Something airbnb.com something.')).toEqual([]);
    });

    it('errors for all miscasing', () => {
      expect(
        instance.checkForAirbnbErrors(
          'Something AirBnB something AIRbnb something AirBnb something airbnb something Airbnb.',
        ),
      ).toEqual([
        {
          short_message: '',
          message: 'Improper company spelling or casing',
          offset: 10,
          length: 6,
          found: 'AirBnB',
          replacements: ['Airbnb'],
          rule_id: 'AIRBNB_SPELLING_OR_CASING',
        },
        {
          short_message: '',
          message: 'Improper company spelling or casing',
          offset: 27,
          length: 6,
          found: 'AIRbnb',
          replacements: ['Airbnb'],
          rule_id: 'AIRBNB_SPELLING_OR_CASING',
        },
        {
          short_message: '',
          message: 'Improper company spelling or casing',
          offset: 44,
          length: 6,
          found: 'AirBnb',
          replacements: ['Airbnb'],
          rule_id: 'AIRBNB_SPELLING_OR_CASING',
        },
        {
          short_message: '',
          message: 'Improper company spelling or casing',
          offset: 61,
          length: 6,
          found: 'airbnb',
          replacements: ['Airbnb'],
          rule_id: 'AIRBNB_SPELLING_OR_CASING',
        },
      ]);
    });

    it('errors for all misspellings', () => {
      expect(
        instance.checkForAirbnbErrors(
          'Something Aribnb something Airbbn something airnbb something iarbnb something Airbnb.',
        ),
      ).toEqual([
        {
          short_message: '',
          message: 'Improper company spelling or casing',
          offset: 10,
          length: 6,
          found: 'Aribnb',
          replacements: ['Airbnb'],
          rule_id: 'AIRBNB_SPELLING_OR_CASING',
        },
        {
          short_message: '',
          message: 'Improper company spelling or casing',
          offset: 27,
          length: 6,
          found: 'Airbbn',
          replacements: ['Airbnb'],
          rule_id: 'AIRBNB_SPELLING_OR_CASING',
        },
        {
          short_message: '',
          message: 'Improper company spelling or casing',
          offset: 44,
          length: 6,
          found: 'airnbb',
          replacements: ['Airbnb'],
          rule_id: 'AIRBNB_SPELLING_OR_CASING',
        },
        {
          short_message: '',
          message: 'Improper company spelling or casing',
          offset: 61,
          length: 6,
          found: 'iarbnb',
          replacements: ['Airbnb'],
          rule_id: 'AIRBNB_SPELLING_OR_CASING',
        },
      ]);
    });
  });

  describe('getCaretOffset()', () => {
    it('returns 0s for no children', () => {
      expect(instance.getCaretOffset()).toEqual({ top: 0, left: 0 });
    });

    it('returns 2nd child offsets', () => {
      const ref = document.createElement('div');

      Object.defineProperty(ref, 'children', { value: [{}, { offsetTop: 15, offsetLeft: 25 }] });

      instance.caretRef = { current: ref };

      expect(instance.getCaretOffset()).toEqual({
        top: 15,
        left: 25,
      });
    });
  });

  describe('selectErrorAtPosition()', () => {
    it('does nothing if no errors', () => {
      getInstance(wrapper).selectErrorAtPosition(0);

      expect(wrapper.state('selectedError')).toBeNull();
    });

    it('does nothing if selection out of range', () => {
      wrapper.setState({
        errors: [error],
      });

      getInstance(wrapper).selectErrorAtPosition(9);

      expect(wrapper.state('selectedError')).toBeNull();
    });

    it('selects error if selection in range', () => {
      wrapper.setState({
        errors: [error],
      });

      getInstance(wrapper).selectErrorAtPosition(13);

      expect(wrapper.state('selectedError')).toEqual(error);
    });
  });

  describe('handleTextAreaKeyDown()', () => {
    it('does nothing if wrong keydown key', () => {
      const spy = jest.spyOn(instance, 'selectErrorAtPosition');

      wrapper.find(BaseTextArea).simulate('keydown', {
        type: 'keydown',
        key: 'Enter',
      });

      expect(spy).not.toHaveBeenCalled();
    });

    it('selects error at position', () => {
      const spy = jest.spyOn(instance, 'selectErrorAtPosition');

      wrapper.find(BaseTextArea).simulate('keydown', {
        type: 'keydown',
        key: 'ArrowLeft',
        currentTarget: { selectionStart: 9 },
      });

      expect(spy).toHaveBeenCalledWith(9);
    });
  });

  describe('handleTextAreaClick()', () => {
    it('selects error at position', () => {
      const spy = jest.spyOn(instance, 'selectErrorAtPosition');

      wrapper.find(BaseTextArea).simulate('click', {
        currentTarget: { selectionStart: 10 },
      });

      expect(spy).toHaveBeenCalledWith(10);
    });
  });

  describe('handleInput()', () => {
    it('sets a RAF handle', () => {
      expect(instance.inputRaf).toBe(0);

      wrapper.find(BaseTextArea).simulate('input');

      expect(instance.inputRaf).not.toBe(0);
    });
  });

  describe('handleInputScroll()', () => {
    beforeEach(() => {
      instance.inputRaf = 0;
      // @ts-ignore Allow non-element
      instance.textareaRef = {
        // @ts-ignore
        current: {
          scrollTop: 500,
          scrollHeight: 2000,
          offsetHeight: 500,
        },
      };
      // @ts-ignore Allow non-element
      instance.controlsRef = {
        // @ts-ignore
        current: {
          offsetHeight: 50,
        },
      };
      // @ts-ignore Allow non-element
      instance.caretRef = {
        // @ts-ignore
        current: {
          children: [{}, { offsetTop: 950 }],
        },
      };
    });

    it('sets scrollTop if offset within middle buffer', () => {
      wrapper.find(BaseTextArea).simulate('input');

      expect(instance.textareaRef.current!.scrollTop).toBe(585);
    });

    it('sets scrollTop if offset within bottom buffer', () => {
      // @ts-ignore
      instance.caretRef.current!.children = [{}, { offsetTop: 1940 }];

      wrapper.find(BaseTextArea).simulate('input');

      expect(instance.textareaRef.current!.scrollTop).toBe(2000);
    });

    it('does nothing if no textarea ref', () => {
      const spy = jest.spyOn(instance, 'getCaretOffset');

      instance.textareaRef = { current: null };

      wrapper.find(BaseTextArea).simulate('input');

      expect(spy).not.toHaveBeenCalled();
    });

    it('does nothing if no controls ref', () => {
      const spy = jest.spyOn(instance, 'getCaretOffset');

      instance.controlsRef = { current: null };

      wrapper.find(BaseTextArea).simulate('input');

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('handleOpenErrorMenu()', () => {
    it('sets position to state', () => {
      const textarea = document.createElement('textarea');

      Object.defineProperty(textarea, 'scrollTop', { value: 5 });

      instance.textareaRef = { current: textarea };

      // @ts-ignore Allow private access
      instance.handleOpenErrorMenu(10, 25);

      expect(wrapper.state('position')).toEqual({ top: 5, left: 25 });
    });
  });

  describe('handleReplaceText()', () => {
    beforeEach(() => {
      instance.textareaRef = { current: document.createElement('textarea') };
    });

    it('replaces text and resets state', () => {
      wrapper.setState({
        text: 'Something foobar',
        errors: [error],
        position: { top: 0, left: 0 },
        selectedError: error,
      });

      wrapper.find(ErrorMenu).simulate('replaceText', error, 'foo');

      expect(wrapper.state()).toEqual(
        expect.objectContaining({
          text: 'Something foo',
          errors: [],
          position: null,
          selectedError: null,
        }),
      );
    });

    it('starts checking new text', () => {
      wrapper.setState({
        text: 'Something foobar',
        errors: [error],
        position: { top: 0, left: 0 },
        selectedError: error,
      });

      wrapper.find(ErrorMenu).simulate('replaceText', error, 'foo');

      expect(props.onCheckText).toHaveBeenCalled();
    });

    it('sets cursor position', () => {
      const spy = jest.fn();

      wrapper.setState({
        text: 'Something foobar',
        errors: [error],
        position: { top: 0, left: 0 },
        selectedError: error,
      });

      instance.textareaRef.current!.setSelectionRange = spy;

      wrapper.find(ErrorMenu).simulate('replaceText', error, 'foo');

      expect(spy).toHaveBeenCalledWith(13, 13);
    });

    it('calls `onChange`', () => {
      const spy = jest.fn();

      wrapper.setProps({
        onChange: spy,
      });

      wrapper.setState({
        text: 'Something foobar',
        errors: [error],
        position: { top: 0, left: 0 },
        selectedError: error,
      });

      wrapper.find(ErrorMenu).simulate('replaceText', error, 'foo');

      expect(spy).toHaveBeenCalledWith('Something foo', expect.anything());
    });
  });

  describe('setCursorPosition()', () => {
    it('calls setSelectionRange on the textarea ref', () => {
      const spy = jest.fn();
      // @ts-ignore Allow non-element
      instance.textareaRef = {
        // @ts-ignore Allow non-element
        current: {
          scrollTop: 100,
          style: {},
          setSelectionRange: spy,
        },
      };

      instance.setCursorPosition({
        selectionStart: 10,
        selectionEnd: 11,
      });

      expect(spy).toHaveBeenCalledWith(10, 11);
    });
  });

  describe('handleScroll()', () => {
    beforeEach(() => {
      jest.useFakeTimers();

      // @ts-ignore Allow non-element
      instance.shadowRef = { current: { scrollTop: 0, style: {} } };
      instance.textareaRef = {
        // @ts-ignore Allow non-element
        current: {
          scrollTop: 100,
          style: {},
          setSelectionRange: () => {},
        },
      };
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('adds scroll top to shadow', () => {
      wrapper.find(BaseTextArea).simulate('scroll');

      expect(instance.shadowRef.current!.scrollTop).toBe(100);
    });

    it('resets error and position if set', () => {
      wrapper.setState({
        selectedError: error,
        position: { top: 0, left: 0 },
      });

      instance.textareaRef.current!.scrollTop = 0;

      wrapper.find(BaseTextArea).simulate('scroll');

      expect(wrapper.state('selectedError')).toBeNull();
      expect(wrapper.state('position')).toBeNull();
    });

    it('sets height', () => {
      wrapper.setState({
        position: { top: 0, left: 0 },
      });

      instance.textareaRef.current!.scrollTop = 100;
      instance.textareaRef.current!.style.height = '50px';
      instance.textareaRef.current!.style.minHeight = '25px';

      wrapper.find(BaseTextArea).simulate('scroll');

      expect(instance.shadowRef.current!.style.height).toBe('50px');
      expect(instance.shadowRef.current!.style.minHeight).toBe('25px');
    });
  });

  describe('handleSelectLocale()', () => {
    it('sets locale and hides menu', () => {
      wrapper.setState({
        selectedLocale: 'en-US',
        showLocaleMenu: true,
      });

      wrapper.find(LocaleMenu).simulate('selectLocale', 'en-CA');

      expect(wrapper.state('selectedLocale')).toBe('en-CA');
      expect(wrapper.state('showLocaleMenu')).toBe(false);
    });

    it('checks text after setting locale', () => {
      const spy = jest.fn();

      instance.checkTextAndClearErrors = spy;

      wrapper.setState({
        selectedLocale: 'en-US',
        showLocaleMenu: true,
      });

      wrapper.find(LocaleMenu).simulate('selectLocale', 'en-CA');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('handleToggleLocaleMenu()', () => {
    it('toggles display of menu', () => {
      expect(wrapper.state('showLocaleMenu')).toBe(false);

      wrapper.find(Link).simulate('click');

      expect(wrapper.state('showLocaleMenu')).toBe(true);

      wrapper.find(Link).simulate('click');

      expect(wrapper.state('showLocaleMenu')).toBe(false);
    });
  });

  describe('selectAppropriateLocale()', () => {
    it('selects none locale', () => {
      wrapper.setProps({
        locale: 'none',
      });

      instance.selectAppropriateLocale();

      expect(wrapper.state('selectedLocale')).toBe('none');
      expect(wrapper.state('unsupportedLocale')).toBeNull();
    });

    it('selects auto locale', () => {
      wrapper.setProps({
        locale: 'auto',
      });

      instance.selectAppropriateLocale();

      expect(wrapper.state('selectedLocale')).toBe('auto');
      expect(wrapper.state('unsupportedLocale')).toBeNull();
    });

    it('selects shorthand locale', () => {
      wrapper.setProps({
        locale: 'ja',
      });

      instance.selectAppropriateLocale();

      expect(wrapper.state('selectedLocale')).toBe('ja-JP');
      expect(wrapper.state('unsupportedLocale')).toBeNull();
    });

    it('selects full locale', () => {
      wrapper.setProps({
        locale: 'ro-RO',
      });

      instance.selectAppropriateLocale();

      expect(wrapper.state('selectedLocale')).toBe('ro-RO');
      expect(wrapper.state('unsupportedLocale')).toBeNull();
    });

    it('selects from possible matches', () => {
      wrapper.setProps({
        locale: 'ca',
      });

      instance.selectAppropriateLocale();

      expect(wrapper.state('selectedLocale')).toBe('ca-ES');
      expect(wrapper.state('unsupportedLocale')).toBeNull();
    });

    it('doesnt set unsupported', () => {
      wrapper.setProps({
        locale: 'foo',
      });

      instance.selectAppropriateLocale();

      expect(wrapper.state('selectedLocale')).toBeNull();
      expect(wrapper.state('unsupportedLocale')).toBe('foo');
    });

    it('checks text after setting locale', () => {
      const spy = jest.fn();

      instance.checkTextAndClearErrors = spy;

      wrapper.setProps({
        locale: 'ca',
      });

      instance.selectAppropriateLocale();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('renderTextWithMarks()', () => {
    const markProps: MarkProps = {
      children: 'Mark children',
      selected: false,
      onSelect: expect.anything(),
      alwaysHighlight: false,
    };

    it('returns text if no errors', () => {
      wrapper.setState({
        text: 'Something foobar',
      });

      expect(instance.renderTextWithMarks()).toBe('Something foobar');
    });

    it('wraps errors in a mark', () => {
      wrapper.setState({
        text: 'Something foobar',
        errors: [error],
      });

      expect(instance.renderTextWithMarks()).toEqual([
        'Something ',
        <Mark {...markProps} key="foobar-10">
          foobar
        </Mark>,
        '',
        '.',
      ]);
    });

    it('wraps errors in a secondary mark if isRuleSecondary() is true', () => {
      wrapper.setState({
        text: 'Something foobar',
        errors: [{ ...error }],
      });

      wrapper.setProps({
        isRuleSecondary: () => true,
      });

      expect(instance.renderTextWithMarks()).toEqual([
        'Something ',
        <SecondaryMark {...markProps} key="foobar-10">
          foobar
        </SecondaryMark>,
        '',
        '.',
      ]);
    });

    it('sets mark as highlighted if isRuleHighlighted() is true', () => {
      wrapper.setState({
        text: 'Something foobar',
        errors: [{ ...error }],
      });

      wrapper.setProps({
        isRuleHighlighted: () => true,
      });

      expect(instance.renderTextWithMarks()).toEqual([
        'Something ',
        <Mark {...markProps} key="foobar-10" alwaysHighlight>
          foobar
        </Mark>,
        '',
        '.',
      ]);
    });

    it('sets mark as selected if errors match', () => {
      wrapper.setState({
        text: 'Something foobar',
        errors: [error],
        selectedError: error,
      });

      expect(instance.renderTextWithMarks()).toEqual([
        'Something ',
        <Mark {...markProps} key="foobar-10" selected>
          foobar
        </Mark>,
        '',
        '.',
      ]);
    });

    it('orders by offset', () => {
      wrapper.setState({
        text: 'something foobar',
        errors: [
          error,
          {
            message: 'Uncapitalized',
            short_message: 'Uncapitalized',
            offset: 0,
            length: 9,
            replacements: ['Something'],
            rule_id: 'UPPERCASE_SENTENCE_START',
          },
        ],
        selectedError: error,
      });

      expect(instance.renderTextWithMarks()).toEqual([
        '',
        <Mark {...markProps} key="something-0">
          something
        </Mark>,
        ' ',
        <Mark {...markProps} key="foobar-10" selected>
          foobar
        </Mark>,
        '',
        '.',
      ]);
    });
  });
});
